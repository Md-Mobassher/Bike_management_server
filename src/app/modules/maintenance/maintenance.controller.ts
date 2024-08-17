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

const getMyRequestedMaintenance = catchAsync(async (req, res) => {
  const result = await MaintenanceServices.getMyRequestedMaintenanceFromDB(
    req.query,
    req.user,
  );

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

const getMaintenanceStatistics = catchAsync(async (req, res) => {
  const result = await MaintenanceServices.getMaintenanceStatistics();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike Maintenance statistics retrieved succesfull!',
    data: result,
  });
});

export const MaintenanceControllers = {
  getAllMaintenance,
  getMyRequestedMaintenance,
  requestMaintenance,
  updateMaintenance,
  getMaintenanceStatistics,
};
