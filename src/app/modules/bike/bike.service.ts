/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TBike } from './bike.interface';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { Bike } from './bike.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { bikeSearchableFields } from './bike.constant';

const addBikeIntoDB = async (file: any, payload: TBike) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const imageName = `${payload.name}`;
    const path = file?.path;

    //send image to cloudinary
    const { secure_url }: any = await sendImageToCloudinary(imageName, path);

    // set Image
    payload.bikeImage = secure_url;

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

const getAllBikesFromDB = async (query: Record<string, unknown>) => {
  const bikeQuery = new QueryBuilder(Bike.find(), query)
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

const deleteBikeFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedBike = await Bike.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedBike) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Bike');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedBike;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete Bike');
  }
};

export const BikeServices = {
  addBikeIntoDB,
  getAllBikesFromDB,
  getSingleBikeFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
};
