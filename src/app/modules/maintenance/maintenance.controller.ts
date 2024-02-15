import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { MaintenanceServices } from './maintenance.service';

const requestMaintenance = catchAsync(async (req, res) => {
  const result = await MaintenanceServices.requestMaintenanceFromDB(req.body);

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
    message: 'Bike maintenance request succesfull!',
    data: result,
  });
});

export const MaintenanceControllers = {
  requestMaintenance,
  updateMaintenance,
};
