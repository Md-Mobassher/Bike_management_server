/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TBike = {
  bikeId: string;
  name: string;
  price: number;
  quantity: number;
  releaseDate: string;
  brand: string;
  model: string;
  type: string;
  size: string;
  color: string;
  gearType: string;
  material: string;
  suspensionType: string;
  bikeImage?: string;
  isDeleted?: boolean;
};

export interface BikeModel extends Model<TBike> {
  // instance method for checking if the bike exists or not
  isBikeExists(bikeId: string): Promise<TBike | null>;
}
