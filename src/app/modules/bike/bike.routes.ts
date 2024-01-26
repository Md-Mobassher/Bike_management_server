import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/sendImageToCloudinary';
import { BikeVAlidation } from './bike.validation';
import { BikeControllers } from './bike.controller';

const router = express.Router();

router.post(
  '/add-Bike',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(BikeVAlidation.createBikeValidationSchema),
  BikeControllers.addBike,
);

export const BikeRoutes = router;
