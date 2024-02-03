import { Schema, model } from 'mongoose';
import { TBike } from './bike.interface';

const bikeSchema = new Schema<TBike>(
  {
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
    isDeleted: { type: Boolean, default: false, select: 0 },
  },
  {
    timestamps: true,
  },
);

bikeSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

bikeSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Bike = model<TBike>('Bike', bikeSchema);
