import { Types } from 'mongoose';

export type TSaleBike = {
  bikeId: Types.ObjectId;
  quantity: number;
  buyerName: string;
  salesDate: Date;
};
