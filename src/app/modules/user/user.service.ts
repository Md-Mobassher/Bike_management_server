/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TUser } from './user.interface';
import { User } from './user.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createUserIntoDB = async (file: any, payload: TUser) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const imageName = `${payload.name}`;
    const path = file?.path;

    //send image to cloudinary
    const { secure_url }: any = await sendImageToCloudinary(imageName, path);

    // set Image
    payload.profileImg = secure_url;

    // create a User
    const newUser = await User.create([payload], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Create User');
    }

    await session.commitTransaction();
    await session.endSession();

    const result = {
      name: newUser[0].name,
      email: newUser[0].email,
      contactNo: newUser[0].contactNo,
      gender: newUser[0].gender,
      dateOfBirth: newUser[0].dateOfBirth,
      presentAddress: newUser[0].presentAddress,
      permanentAddress: newUser[0].presentAddress,
      profileImg: newUser[0].profileImg,
    };
    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createUserIntoDB,
};
