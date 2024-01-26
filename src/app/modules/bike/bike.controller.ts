import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BikeServices } from './bike.service';

const addBike = catchAsync(async (req, res) => {
  const { ...bikeData } = req.body;
  console.log('=>', req.body);
  const result = await BikeServices.addBikeIntoDB(req.file, bikeData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike is created succesfully!',
    data: result,
  });
});

export const BikeControllers = {
  addBike,
};
