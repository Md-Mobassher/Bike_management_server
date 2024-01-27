import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SalesServices } from './sale.service';

const sellBike = catchAsync(async (req, res) => {
  const result = await SalesServices.sellBike(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike Sales Successfull!',
    data: result,
  });
});

export const SalesControllers = {
  sellBike,
};
