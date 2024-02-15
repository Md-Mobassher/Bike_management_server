import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { InvoiceServices } from './invoice.service';

const getInvoice = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await InvoiceServices.getInvoiceFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Invoice retrieved succesfully',
    data: result,
  });
});

export const InvoiceControllers = {
  getInvoice,
};
