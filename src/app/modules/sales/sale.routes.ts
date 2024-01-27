import express from 'express';
import { SalesControllers } from './sale.controller';

const router = express.Router();

router.post('/', SalesControllers.sellBike);
router.get('/:interval', SalesControllers.salesHistory);

export const SalesRoutes = router;
