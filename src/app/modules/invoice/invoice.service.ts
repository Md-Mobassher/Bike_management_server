import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Sale } from '../sales/sale.model';

const getInvoiceFromDB = async (id: string) => {
  const result = await Sale.findById(id)
    .populate('sellerId')
    .populate('bikeId');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Sales could not Found!');
  }
  return result;
};

export const InvoiceServices = {
  getInvoiceFromDB,
};
