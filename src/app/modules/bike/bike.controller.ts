import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BikeServices } from './bike.service';

import AppError from '../../errors/AppError';

const addBike = catchAsync(async (req, res) => {
  const { ...bikeData } = req.body;
  const result = await BikeServices.addBikeIntoDB(req.file, bikeData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike is created succesfully!',
    data: result,
  });
});

const duplicateBike = catchAsync(async (req, res) => {
  const { ...bikeData } = req.body;
  const result = await BikeServices.duplicateBikeIntoDB(bikeData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike duplicated succesfully!',
    data: result,
  });
});

const getAllBikes = catchAsync(async (req, res) => {
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

const bulkDeleteBikes = catchAsync(async (req, res) => {
  const result = await BikeServices.bulkDeleteBikesFromDB(req.body);
  if (!result.modifiedCount) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete Bikes');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bikes are deleted succesfully',
    data: null,
  });
});

const deleteBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BikeServices.deleteBikeFromDB(id);
  if (result?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete Bikes');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike is deleted succesfully',
    data: null,
  });
});

const bikeAnalytics = catchAsync(async (req, res) => {
  const result = await BikeServices.bikeAnalytics();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike analytics retrived succesfully',
    data: result,
  });
});

export const BikeControllers = {
  addBike,
  duplicateBike,
  getAllBikes,
  getSingleBike,
  updateBike,
  deleteBike,
  bulkDeleteBikes,
  bikeAnalytics,
};
