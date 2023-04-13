import type { NextRequest } from 'next/server';
import { API_URL } from '../../constants';

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get('name');
  const id = request.nextUrl.searchParams.get('id');
  const url = id ? `${API_URL}/movie/${id}` : `${API_URL}/movie?name=${name}`;

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.LOTR_ACCESS_TOKEN}`,
    },
  });
}
