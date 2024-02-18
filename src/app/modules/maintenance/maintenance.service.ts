import { Maintenance } from './maintenance.model';
import { TMaintenance, TMaintenanceInput } from './maintenance.interface';

const requestMaintenanceFromDB = async (payload: TMaintenanceInput) => {
  const result = await Maintenance.create(payload);
  return result;
};

const updateMaintenanceFromDB = async (payload: TMaintenance) => {
  const { bikeId, discount, ...updateBikeData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...updateBikeData,
  };

  if (discount && Object.keys(discount).length) {
    for (const [key, value] of Object.entries(discount)) {
      modifiedUpdatedData[`discount.${key}`] = value;
    }
  }
  console.log(modifiedUpdatedData);

  const result = await Maintenance.findOneAndUpdate(
    { bikeId },
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
