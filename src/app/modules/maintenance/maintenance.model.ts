import mongoose, { Schema } from 'mongoose';
import { TMaintenance } from './maintenance.interface';

const maintenanceSchema = new Schema<TMaintenance>({
  bikeId: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
  lastServicingDate: { type: Date, required: true },
  nextServicingDate: { type: Date, required: true },
  serviceDetails: { type: [String], required: true },
  notes: { type: String },
  discount: {
    percentage: { type: Number, default: 0 },
    fixedAmount: { type: Number, default: 0 },
  },
});

export const Maintenance = mongoose.model<TMaintenance>(
  'Maintenance',
  maintenanceSchema,
);
