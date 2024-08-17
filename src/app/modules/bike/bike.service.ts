/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Types } from 'mongoose';
import { TBike } from './bike.interface';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { Bike } from './bike.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { bikeSearchableFields } from './bike.constant';
import { Sale } from '../sales/sale.model';

const addBikeIntoDB = async (file: any, payload: TBike) => {
  const isBikeExists = await Bike.isBikeExists(payload.bikeId);
  if (isBikeExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Bike Already Exists!');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (file) {
      const imageName = `${payload.name}`;
      const path = file?.path;
      //send image to cloudinary
      const { secure_url }: any = await sendImageToCloudinary(imageName, path);
      payload.bikeImage = secure_url as string;
    }

    // create a bike
    const newBike = await Bike.create([payload], { session });

    if (!newBike.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to add Bike');
    }

    await session.commitTransaction();
    await session.endSession();

    return newBike;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const duplicateBikeIntoDB = async (payload: TBike) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isBikeExists = await Bike.isBikeExists(payload.bikeId);
    if (isBikeExists) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Bike Already Exists!');
    }

    // create a bike
    const newBike = await Bike.create([payload], { session });

    if (!newBike.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Duplicate Bike');
    }

    await session.commitTransaction();
    await session.endSession();

    return newBike;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getAllBikesFromDB = async (query: Record<string, unknown>) => {
  const minPrice = query.minPrice
    ? parseFloat(query.minPrice as string)
    : undefined;
  const maxPrice = query.maxPrice
    ? parseFloat(query.maxPrice as string)
    : undefined;

  const bikeQuery = new QueryBuilder(Bike.find(), {
    ...query,
    minPrice,
    maxPrice,
  })
    .search(bikeSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bikeQuery.modelQuery;

  return result;
};

const getSingleBikeFromDB = async (id: string) => {
  const result = await Bike.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not Found!');
  }
  return result;
};

const updateBikeIntoDB = async (id: string, payload: Partial<TBike>) => {
  const { ...updateBikeData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...updateBikeData,
  };

  const result = await Bike.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const bulkDeleteBikesFromDB = async (payload: { bikeIds: string[] }) => {
  const bikeIds = payload?.bikeIds.map((id) => new Types.ObjectId(id));

  const result = await Bike.updateMany(
    { _id: { $in: bikeIds } },
    {
      isDeleted: true,
    },
    {
      runValidators: true,
    },
  );

  return result;
};

const deleteBikeFromDB = async (id: string) => {
  const result = await Bike.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const bikeAnalytics = async () => {
  const totalBikes = await Bike.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: null, total: { $sum: '$quantity' } } },
  ]).then((res) => (res[0] ? res[0].total : 0));

  const totalSalesResult = await Sale.aggregate([
    {
      $group: {
        _id: null,
        totalSales: { $sum: '$quantity' },
      },
    },
  ]);

  const totalSales =
    totalSalesResult.length > 0 ? totalSalesResult[0].totalSales : 0;

  // Calculate the total available for sale by subtracting the total sales from the total bikes
  const totalAvailableForSale = totalBikes - totalSales;

  return {
    totalBikes,
    totalSales,
    totalAvailableForSale,
  };
};

export const BikeServices = {
  addBikeIntoDB,
  duplicateBikeIntoDB,
  getAllBikesFromDB,
  getSingleBikeFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
  bulkDeleteBikesFromDB,
  bikeAnalytics,
};
