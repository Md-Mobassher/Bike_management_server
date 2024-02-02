import express from 'express';
import { SalesControllers } from './sale.controller';
import validateRequest from '../../middlewares/validateRequest';
import { salesValidationSchema } from './salesValidation';

const router = express.Router();

router.post(
  '/',
  validateRequest(salesValidationSchema),
  SalesControllers.sellBike,
);
router.get('/:interval', SalesControllers.salesHistory);

export const SalesRoutes = router;
