import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app-error';

// Central Institutional Error Handler
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`💥 [AMSH API ERROR]: ${err.stack}`);

  // 1. Handled Operational Errors (AppError)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // 2. Prisma Specific Errors
  if (err.code === 'P2002') {
    return res.status(409).json({
      status: 'error',
      message: `A duplicate record was found for one of your institutional fields (${err.meta?.target}).`,
    });
  }

  // 3. Multer (File Upload) Errors
  if (err.name === 'MulterError' || err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      status: 'error',
      message: err.message === 'File too large' 
        ? 'Institutional upload limit exceeded (Max: 50MB). Please compress your PDF.' 
        : `Upload error: ${err.message}`,
    });
  }

  // 4. Fallback: Generic Server Error
  const statusCode = err.status || 500;
  
  // Extra detail for Prisma connection errors in production to aid debugging
  const isPrismaError = err.message?.includes('Prisma') || err.name?.includes('Prisma');
  
  return res.status(statusCode).json({
    status: 'error',
    message: (process.env.NODE_ENV === 'production' && !isPrismaError)
      ? 'An internal server error occurred.' 
      : err.message,
  });
};
