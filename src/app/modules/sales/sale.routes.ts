import express from 'express';
import { SalesControllers } from './sale.controller';

const router = express.Router();

router.post('/', SalesControllers.sellBike);

export const SalesRoutes = router;
