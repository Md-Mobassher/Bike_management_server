/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TSaleBike } from './sale.interface';
import { Bike } from '../bike/bike.model';
import { Sale } from './sale.model';
import mongoose from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

const sellBikeFromDb = async (user: JwtPayload, payload: TSaleBike) => {
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
    payload.sellerId = user._id as string;

    payload.totalAmount = Number(payload.quantity * bike.price);

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

const getSalesHistory = async (payload: any) => {
  try {
    let startDate;

    switch (payload?.interval) {
      case 'daily':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 1);
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'weekly':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'monthly':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'yearly':
        startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
        startDate.setHours(0, 0, 0, 0);
        break;
      default:
        throw new AppError(httpStatus.NOT_FOUND, 'Invalid interval');
    }

    const salesHistory = await Sale.aggregate([
      {
        $match: {
          salesDate: {
            $gte: startDate.toISOString().split('T')[0],
          },
        },
      },
      {
        $sort: { salesDate: -1 },
      },
    ]);

    return salesHistory;
  } catch (error) {
    throw new AppError(httpStatus.NOT_FOUND, `${error}`);
  }
};

const getSalesAnalytics = async () => {
  const totalSales = await Sale.find();
  return totalSales;
};

export const SalesServices = {
  sellBikeFromDb,
  getSalesHistory,
  getSalesAnalytics,
};
