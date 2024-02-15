import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/sendImageToCloudinary';
import { BikeVAlidation } from './bike.validation';
import { BikeControllers } from './bike.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.seller),

  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },

  validateRequest(BikeVAlidation.createBikeValidationSchema),
  BikeControllers.addBike,
);

router.post(
  '/duplicate/:id',
  auth(USER_ROLE.seller),

  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },

  validateRequest(BikeVAlidation.createBikeValidationSchema),
  BikeControllers.duplicateBike,
);

router.get(
  '/',
  auth(USER_ROLE.seller, USER_ROLE.buyer),
  BikeControllers.getAllBikes,
);

router.get(
  '/:id',
  auth(USER_ROLE.seller, USER_ROLE.buyer),
  BikeControllers.getSingleBike,
);

router.patch(
  '/:id',
  auth(USER_ROLE.seller),
  validateRequest(BikeVAlidation.updateBikeValidationSchema),
  BikeControllers.updateBike,
);

router.delete(
  '/bulk-delete',
  auth(USER_ROLE.seller),
  validateRequest(BikeVAlidation.bulkDeleteBikeValidationSchema),
  BikeControllers.bulkDeleteBikes,
);

router.delete('/:id', auth(USER_ROLE.seller), BikeControllers.deleteBike);

export const BikeRoutes = router;
