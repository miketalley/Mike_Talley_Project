import type { NextRequest } from 'next/server';
import { API_URL } from '../../constants';

export async function GET(request: NextRequest) {
  return fetch(
    `${API_URL}/movie?name=${request.nextUrl.searchParams.get('name')}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.LOTR_ACCESS_TOKEN}`,
      },
    },
  );
}
