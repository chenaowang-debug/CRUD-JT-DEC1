import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { pool, createSchema } from './dbSchema';
import jobController from './middlewares/jobController';

const app = express();
const PORT: number = 3000;

createSchema();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

interface ServerError {
  log: string;
  status: number;
  message: { err: string };
  success: boolean;
}

app.post(
  '/add',
  jobController.addJob,
  (req: Request, res: Response, next: NextFunction) => {
    console.log(res.locals.rows);
    res.status(200).send(res.locals.rows);
  }
);

app.use(
  (err: ServerError, req: Request, res: Response, next: NextFunction): void => {
    const defaultErr: ServerError = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occured' },
      success: false,
    };
    const errorObj: ServerError = { ...defaultErr, ...err };
    console.log(errorObj.log);
    if (errorObj.status !== undefined) {
      res.status(errorObj.status).json(errorObj.message);
    }
  }
);

process.on('SIGINT', async () => {
  console.log('Closing database connection...');
  await pool.end();
  console.log('Database connection has been closed');
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
