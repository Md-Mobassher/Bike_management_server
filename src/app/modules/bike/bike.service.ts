/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TBike } from './bike.interface';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { Bike } from './bike.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

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

export const BikeServices = {
  addBikeIntoDB,
};
