import { Maintenance } from './maintenance.model';
import { TMaintenance, TMaintenanceInput } from './maintenance.interface';

const requestMaintenanceFromDB = async (payload: TMaintenanceInput) => {
  const result = await Maintenance.create(payload);
  return result;
};

const updateMaintenanceFromDB = async (payload: TMaintenance) => {
  const { ...updateBikeData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...updateBikeData,
  };

  const result = await Maintenance.findByIdAndUpdate(
    payload.bikeId,
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const MaintenanceServices = {
  requestMaintenanceFromDB,
  updateMaintenanceFromDB,
};
