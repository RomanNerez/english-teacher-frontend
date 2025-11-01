import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next'
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getServerSession } from "next-auth"
import { checkAndRefreshTokens } from "./token-service";

const getUser = async (accessToken: string) => {
    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
        },
    });

    const data = await res.json();

    return data.data;
}

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        
        let jwtData = {};

        const res = await fetch(`${process.env.BACKEND_URL}/api/v1/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const setCookieHeader = res.headers.get('set-cookie');
        
         if (setCookieHeader) {
            const refreshCookie = setCookieHeader.split(";")[0];
            const [name, value] = refreshCookie.split("=");
            jwtData.refreshToken = value;
          }

        const data = await res.json();

        if (!res.ok || !data?.data.access_token) return null;

        jwtData.accessToken = data.data.access_token;

        jwtData.user = await getUser(data.data.access_token);
        
        return jwtData;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
        if (user) {
          return {
            user: user.user,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            isValidBackendToken: true,
          };
        }

        const {
          tokens: { accessToken, refreshToken },
          valid,
          error,
        } = await checkAndRefreshTokens({
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        });

        return {
          user: token.user,
          accessToken,
          refreshToken,
          isValidBackendToken: valid,
          error,
        };
    },
    async session({ session, token }) {
      return {
        user: token.user,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        isValidBackendToken: token.isValidBackendToken
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies AuthOptions;

export default NextAuth(authConfig);

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authConfig)
}
