import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {Button} from '@shared/ui/button';
import { backendRequest } from '@/app/api/login/route';

export async function HomePage() {
  // const cookieStore = await cookies();
  // const token = cookieStore.get('access_token')?.value;
  // const rtoken = cookieStore.get('refresh_token')?.value;
  // console.log(token, rtoken);

  // if (!token) redirect('/login');

  // const res = await backendRequest('/me', {
  //   headers: { Authorization: `Bearer ${token}` },
  // });

  // if (!res.ok) redirect('/login');
  // const user = await res.json();

  return <Button variant="contained">Hello world</Button>;
}