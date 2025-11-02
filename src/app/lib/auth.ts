import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next'
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getServerSession } from "next-auth"
import { checkAndRefreshTokens } from "./token-service";
import { BackendService } from '@shared/api/backend';
import { getCookieValue } from '@shared/lib/parse-cookie-from-set-cookie';

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        remember: { label: 'Password', type: 'checkbox' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        let jwtData: { accessToken: string | null, refreshToken: string | null, user: any | null } = {
          accessToken: null,
          refreshToken: null,
          user: null
        };

        const response = await BackendService.login<{ email: string, password: string, remember: boolean }>({
          email: credentials.email,
          password: credentials.password,
          remember: credentials.remember === 'true'
        });
        const { data } = response;

        if (response.status !== 200) throw new Error(data.data.message);

        jwtData.accessToken = data.data.access_token;
        jwtData.refreshToken = getCookieValue(response.headers['set-cookie'], 'refresh_token');

        const meResponse = await BackendService.me(jwtData.accessToken || '');

        if (meResponse.status !== 200) throw new Error(meResponse.data.message);

        const { data: userData } = meResponse;

        jwtData.user = userData.data;

        console.log(jwtData);

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
