import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SalesServices } from './sale.service';

const sellBike = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await SalesServices.sellBikeFromDb(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike Sales Successfull!',
    data: result,
  });
});

const salesHistory = catchAsync(async (req, res) => {
  const result = await SalesServices.getSalesHistory(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales history retrived successfully!',
    data: result,
  });
});

export const SalesControllers = {
  sellBike,
  salesHistory,
};
