import { HttpException, HttpStatus } from '@nestjs/common';
import { ResponseDTO } from 'src/utils/types';

export const JsonResponse = (res, response): ResponseDTO => {
  const { message, data } = response;

  if (response instanceof HttpException)
    return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message, data: null });

  return res.status(HttpStatus.OK).json({ success: true, message, data });
};

export const ErrorResponse = (res, error: Error): ResponseDTO => {
  if (typeof error.message === 'string')
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: error.message,
      data: null,
    });

  return res.status(HttpStatus.BAD_REQUEST).json({
    success: false,
    message: 'Something went wrong',
    data: null,
  });
};
