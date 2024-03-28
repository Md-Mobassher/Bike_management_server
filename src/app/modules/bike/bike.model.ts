import { Schema, model } from 'mongoose';
import { BikeModel, TBike } from './bike.interface';

const bikeSchema = new Schema<TBike, BikeModel>(
  {
    bikeId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    releaseDate: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    gearType: { type: String, required: true },
    material: { type: String, required: true },
    suspensionType: { type: String, required: true },
    bikeImage: {
      type: String,
      default:
        'https://res.cloudinary.com/dhajseyww/image/upload/v1708758501/Pulser.webp',
    },
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

bikeSchema.statics.isBikeExists = async function (bikeId: string) {
  return await Bike.findOne({ bikeId });
};

export const Bike = model<TBike, BikeModel>('Bike', bikeSchema);
