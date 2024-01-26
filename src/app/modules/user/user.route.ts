import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/create-user',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createUser,
);

export const UserRoutes = router;
