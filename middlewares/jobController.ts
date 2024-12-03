import { Request, Response, NextFunction } from 'express';
import { pool } from '../dbSchema';

interface jobController {
  addJob: (req: Request, res: Response, next: NextFunction) => void;
}

const jobController = {} as jobController;

jobController.addJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    company,
    location,
    jobTitle,
    dateApplied,
    applyMethod,
    coverLetter,
    doubleDown,
  } = req.body;

  const insertQuery = `
    INSERT INTO job_applications.jobs (company, location, job_title, date_applied, apply_method, cover_letter, double_down)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  try {
    const { rows } = await pool.query(insertQuery, [
      company,
      location,
      jobTitle,
      dateApplied,
      applyMethod,
      coverLetter,
      doubleDown,
    ]);
    res.locals.rows = rows[0];
    next();
  } catch (error) {
    console.log('Error inserting data into database', error);
    next(error);
  }
};

export default jobController;
