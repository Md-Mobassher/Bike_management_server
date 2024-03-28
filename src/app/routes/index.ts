import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BikeRoutes } from '../modules/bike/bike.routes';
import { SalesRoutes } from '../modules/sales/sale.routes';
import { InvoiceRoutes } from '../modules/invoice/invoice.routes';
import { MaintainanceRoutes } from '../modules/maintenance/maintenance.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/bikes',
    route: BikeRoutes,
  },
  {
    path: '/sales',
    route: SalesRoutes,
  },
  {
    path: '/invoice',
    route: InvoiceRoutes,
  },
  {
    path: '/maintenance',
    route: MaintainanceRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
