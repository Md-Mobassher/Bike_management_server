import mongoose, { Schema } from 'mongoose';
import { TSaleBike } from './sale.interface';

const saleBikeSchema = new Schema<TSaleBike>({
  sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bikeId: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
  quantity: { type: Number, required: true },
  buyerName: { type: String, required: true },
  salesDate: { type: String, required: true },
  paymentMethod: { type: String },
  isPaymentComplete: { type: Boolean, default: false },
  totalAmount: { type: Number, default: 0 },
});

export const Sale = mongoose.model<TSaleBike>('Sale', saleBikeSchema);
