import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BikeServices } from './bike.service';
import { RequestHandler } from 'express';

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

const getAllBikes: RequestHandler = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllBikesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bikes are retrieved succesfully',
    data: result,
  });
});

const getSingleBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BikeServices.getSingleBikeFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike is retrieved succesfully',
    data: result,
  });
});

const updateBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { ...bike } = req.body;
  const result = await BikeServices.updateBikeIntoDB(id, bike);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike is updated succesfully',
    data: result,
  });
});

const deleteBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BikeServices.deleteBikeFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike is deleted succesfully',
    data: result,
  });
});

export const BikeControllers = {
  addBike,
  getAllBikes,
  getSingleBike,
  updateBike,
  deleteBike,
};
