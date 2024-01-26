import { Schema, model } from 'mongoose';
import { TBike } from './bike.interface';

const bikeSchema = new Schema<TBike>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  releaseDate: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  bikeImage: { type: String, required: true },
});

export const Bike = model<TBike>('Bike', bikeSchema);
