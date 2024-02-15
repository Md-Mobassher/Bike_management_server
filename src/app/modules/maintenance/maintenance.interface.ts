import { Types } from 'mongoose';

export interface TMaintenance extends Document {
  bikeId: Types.ObjectId;
  lastServicingDate: string;
  nextServicingDate: string;
  serviceDetails: string[];
  notes: string;
  discount: {
    percentage: number;
    fixedAmount: number;
  };
}

export interface TMaintenanceInput {
  bikeId: Types.ObjectId;
  lastServicingDate: string;
  nextServicingDate: string;
  serviceDetails: string[];
  notes: string;
  discount?: {
    percentage?: number;
    fixedAmount?: number;
  };
}
