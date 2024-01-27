import mongoose, { Schema } from 'mongoose';
import { TSaleBike } from './sale.interface';

const saleBikeSchema = new Schema<TSaleBike>({
  bikeId: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
  quantity: { type: Number, required: true },
  buyerName: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export const Sale = mongoose.model<TSaleBike>('Sale', saleBikeSchema);
