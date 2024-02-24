import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { MaintenanceServices } from './maintenance.service';

const getAllMaintenance = catchAsync(async (req, res) => {
  const result = await MaintenanceServices.getAllMaintenanceFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike maintenance retrieved succesfull!',
    data: result,
  });
});

const requestMaintenance = catchAsync(async (req, res) => {
  const result = await MaintenanceServices.requestMaintenanceFromDB(
    req.user,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike maintenance request succesfull!',
    data: result,
  });
});

const updateMaintenance = catchAsync(async (req, res) => {
  const result = await MaintenanceServices.updateMaintenanceFromDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike maintenance update succesfull!',
    data: result,
  });
});

export const MaintenanceControllers = {
  getAllMaintenance,
  requestMaintenance,
  updateMaintenance,
};
