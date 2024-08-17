import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { MaintenanceControllers } from './maintenance.controller';
import validateRequest from '../../middlewares/validateRequest';
import { MaintenanceVAlidation } from './maintenance.validation';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.seller),

  MaintenanceControllers.getAllMaintenance,
);
router.get(
  '/analytics',
  auth(USER_ROLE.seller),

  MaintenanceControllers.getMaintenanceStatistics,
);
router.get(
  '/me',
  auth(USER_ROLE.buyer),

  MaintenanceControllers.getMyRequestedMaintenance,
);

router.post(
  '/',
  auth(USER_ROLE.buyer),
  validateRequest(MaintenanceVAlidation.createMaintenanceValidationSchema),
  MaintenanceControllers.requestMaintenance,
);

router.put(
  '/',
  auth(USER_ROLE.seller),
  validateRequest(MaintenanceVAlidation.updateMaintenanceValidationSchema),
  MaintenanceControllers.updateMaintenance,
);

export const MaintainanceRoutes = router;
