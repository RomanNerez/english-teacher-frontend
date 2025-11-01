import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export async function backendRequest(path: string, options: RequestInit = {}) {
  const res = await fetch(`${process.env.BACKEND_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  return res;
}

export async function setTokens(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();
  const options: Partial<ResponseCookie> = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
  };
  cookieStore.set('access_token', accessToken, options);
  cookieStore.set('refresh_token', refreshToken, options);
}

export async function clearTokens() {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
}

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get('access_token')?.value;
}

export async function getRefreshToken() {
  const cookieStore = await cookies();
  return cookieStore.get('refresh_token')?.value;
}

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const res = await backendRequest('/api/v1/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    return new Response(JSON.stringify(data), { status: res.status });
  }

  const setCookieHeader = res.headers.get("set-cookie");
  const cookieStore = await cookies();

 if (setCookieHeader) {
    const refreshCookie = setCookieHeader.split(";")[0];
    const [name, value] = refreshCookie.split("=");

    cookieStore.set(name, value, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  if (data.data.access_token) {
    cookieStore.set("access_token", data.data.access_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 15,
    });
  }

  return NextResponse.json(data);
}
