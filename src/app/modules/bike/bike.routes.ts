import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/sendImageToCloudinary';
import { BikeVAlidation } from './bike.validation';
import { BikeControllers } from './bike.controller';
// import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  // auth('user'),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(BikeVAlidation.createBikeValidationSchema),
  BikeControllers.addBike,
);

router.get('/', BikeControllers.getAllBikes);

router.get('/:id', BikeControllers.getSingleBike);

router.patch(
  '/:id',
  validateRequest(BikeVAlidation.updateBikeValidationSchema),
  BikeControllers.updateBike,
);

router.put('/:id', BikeControllers.deleteBike);

export const BikeRoutes = router;
