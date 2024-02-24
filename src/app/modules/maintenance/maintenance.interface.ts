import { Types } from 'mongoose';

export interface TMaintenance extends Document {
  maintenanceId?: string;
  bikeId: Types.ObjectId;
  buyerId: Types.ObjectId;
  lastServicingDate: string;
  nextServicingDate: string;
  serviceDetails: string[];
  notes: string;
  isPending: boolean;
  discount: {
    percentage: number;
    fixedAmount: number;
  };
}

export interface TMaintenanceInput {
  bikeId: Types.ObjectId;
  buyerId: Types.ObjectId;
  lastServicingDate: string;
  nextServicingDate: string;
  serviceDetails: string[];
  notes: string;
  isPending: boolean;
  discount?: {
    percentage?: number;
    fixedAmount?: number;
  };
}
