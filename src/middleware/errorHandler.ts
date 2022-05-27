import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) return next(err);

  res.status(500).json({ message: '¯\\_(ツ)_/¯' });
};

export default errorHandler;
