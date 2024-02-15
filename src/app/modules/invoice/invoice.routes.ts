import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { InvoiceControllers } from './invoice.controller';

const router = express.Router();

router.get('/:id', auth(USER_ROLE.seller), InvoiceControllers.getInvoice);

export const InvoiceRoutes = router;
