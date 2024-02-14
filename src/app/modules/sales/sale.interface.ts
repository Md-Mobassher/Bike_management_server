import { Types } from 'mongoose';

export type TSaleBike = {
  saleId: Types.ObjectId;
  bikeId: Types.ObjectId;
  quantity: number;
  buyerName: string;
  salesDate: Date;
  paymentMethod?: string;
  totalAmount?: number;
  invoiceId?: Types.ObjectId;
};
