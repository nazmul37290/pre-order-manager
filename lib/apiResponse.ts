import { NextResponse } from 'next/server';

export function apiResponse<T>({
  data,
  message = 'Success',
  status = 200,
}: {
  data?: T;
  message?: string;
  status?: number;
}) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}