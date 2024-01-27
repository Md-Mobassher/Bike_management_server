/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TSaleBike } from './sale.interface';
import { Bike } from '../bike/bike.model';
import { Sale } from './sale.model';
import mongoose from 'mongoose';

const sellBikeFromDb = async (payload: TSaleBike) => {
  const { bikeId, quantity } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // checking if the bike is exist
    const bike = await Bike.findById(bikeId);

    if (!bike) {
      throw new AppError(httpStatus.NOT_FOUND, 'This Bike is not found !');
    }

    // Check if the requested quantity is available
    if (quantity > bike?.quantity) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        `Insufficient stock for the requested quantity! Our available stock is ${bike?.quantity}.`,
      );
    }

    // Sell the bike
    const sale = await Sale.create([payload], { session });

    // Update the bike quantity and sales
    await Bike.findByIdAndUpdate(
      bikeId,
      {
        $inc: { quantity: -quantity, sales: quantity },
      },
      { session },
    );

    await session.commitTransaction();
    await session.endSession();

    return sale;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getSalesHistory = async (payload: string) => {
  let startDate: Date;

  switch (payload) {
    case 'weekly':
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      break;
    case 'daily':
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 1);
      break;
    case 'monthly':
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
      break;
    case 'yearly':
      startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);
      break;
    default:
      throw new AppError(httpStatus.NOT_FOUND, 'Invalid interval');
      return;
  }

  const salesHistory = await Sale.find({ date: { $gte: startDate } })
    .select('date quantity')
    .sort({ date: 'asc' });

  return salesHistory;
};
export const SalesServices = {
  sellBikeFromDb,
  getSalesHistory,
};
