import express from 'express';
import { SalesControllers } from './sale.controller';
import validateRequest from '../../middlewares/validateRequest';
import { salesValidationSchema } from './salesValidation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.seller),
  validateRequest(salesValidationSchema),
  SalesControllers.sellBike,
);

router.get('/history', auth(USER_ROLE.seller), SalesControllers.salesHistory);

export const SalesRoutes = router;
