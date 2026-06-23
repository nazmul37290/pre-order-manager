import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

type ApiErrorOptions = {
  message?: string;
  status?: number;
  error?: unknown;
};

export function apiError({
  message = 'Something went wrong',
  status = 500,
  error,
}: ApiErrorOptions) {

 
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        message: 'Validation failed',
        errors: error.issues,
      },
      { status: 400 }
    );
  }

  if (typeof error === 'object' && error && 'code' in error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Database error',
        error: (error as any).message,
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );
}