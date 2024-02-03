import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

// parsers
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://bike-management-client-alpha.vercel.app',
      'https://bike-management-client-dxtais6u6-md-mobassher.vercel.app',
      '*',
    ],
    credentials: true,
  }),
);

// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is Running');
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
