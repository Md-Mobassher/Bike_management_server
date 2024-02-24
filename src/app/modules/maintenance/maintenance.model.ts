import mongoose, { Schema } from 'mongoose';
import { TMaintenance } from './maintenance.interface';

const maintenanceSchema = new Schema<TMaintenance>({
  bikeId: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
  buyerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lastServicingDate: { type: String, required: true },
  nextServicingDate: { type: String, required: true },
  serviceDetails: { type: [String], required: true },
  notes: { type: String },
  isPending: { type: Boolean, default: true },
  discount: {
    percentage: { type: Number, default: 0 },
    fixedAmount: { type: Number, default: 0 },
  },
});

export const Maintenance = mongoose.model<TMaintenance>(
  'Maintenance',
  maintenanceSchema,
);
