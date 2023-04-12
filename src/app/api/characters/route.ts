import { API_URL } from '../../constants';

export async function GET() {
  return fetch(`${API_URL}/character?limit=2`, {
    headers: {
      Authorization: `Bearer ${process.env.LOTR_ACCESS_TOKEN}`,
    },
  });
}
