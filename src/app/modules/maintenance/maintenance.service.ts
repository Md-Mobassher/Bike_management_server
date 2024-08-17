import { Maintenance } from './maintenance.model';
import { TMaintenance, TMaintenanceInput } from './maintenance.interface';
import { Bike } from '../bike/bike.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { JwtPayload } from 'jsonwebtoken';

const getAllMaintenanceFromDB = async (query: Record<string, unknown>) => {
  const maintenanceQuery = new QueryBuilder(
    Maintenance.find().populate('bikeId').populate('buyerId'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await maintenanceQuery.modelQuery;

  return result;
};
const getMyRequestedMaintenanceFromDB = async (
  query: Record<string, unknown>,
  user: JwtPayload,
) => {
  const maintenanceQuery = new QueryBuilder(
    Maintenance.find({ buyerId: user._id })
      .populate('bikeId')
      .populate('buyerId'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await maintenanceQuery.modelQuery;

  return result;
};

const requestMaintenanceFromDB = async (
  user: JwtPayload,
  payload: TMaintenanceInput,
) => {
  const { bikeId } = payload;
  const { _id } = user;
  payload.buyerId = _id;

  const isBikeExist = await Bike.findById(bikeId);
  if (!isBikeExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not Found!');
  }

  const result = await Maintenance.create(payload);
  return result;
};

const updateMaintenanceFromDB = async (payload: TMaintenance) => {
  const { maintenanceId, discount, ...updateBikeData } = payload;

  const isMaintenanceExist = await Maintenance.findById(maintenanceId);
  if (!isMaintenanceExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Maintenance could not Found!');
  }

  const modifiedUpdatedData: Record<string, unknown> = {
    ...updateBikeData,
  };

  if (discount && Object.keys(discount).length) {
    for (const [key, value] of Object.entries(discount)) {
      modifiedUpdatedData[`discount.${key}`] = value;
    }
  }

  const result = await Maintenance.findByIdAndUpdate(
    maintenanceId,
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const getMaintenanceStatistics = async () => {
  const totalRequests = await Maintenance.countDocuments();
  const totalAccepted = await Maintenance.countDocuments({
    isPending: false,
  });
  const totalPending = await Maintenance.countDocuments({ isPending: true });

  return {
    totalRequests,
    totalAccepted,
    totalPending,
  };
};
export const MaintenanceServices = {
  getAllMaintenanceFromDB,
  getMyRequestedMaintenanceFromDB,
  requestMaintenanceFromDB,
  updateMaintenanceFromDB,
  getMaintenanceStatistics,
};
