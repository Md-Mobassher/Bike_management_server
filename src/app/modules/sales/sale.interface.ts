import { Date, Types } from 'mongoose';

export type TSaleBike = {
  sellerId: Types.ObjectId | string;
  bikeId: Types.ObjectId;
  quantity: number;
  buyerName: string;
  salesDate: string;
  paymentMethod?: string;
  isPaymentComplete?: boolean;
  totalAmount?: number;
  invoiceId?: Types.ObjectId;
};
