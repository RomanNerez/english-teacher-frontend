import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const res = await fetch(`${process.env.BACKEND_URL}/api/v1/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const data = await res.json();
        console.log(data);

        if (!res.ok || !data?.data.access_token) return null;

        return { accessToken: data.data.access_token };
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
        console.log('jwt', token, user);
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
        console.log('session', token, token);
      session.user = {
        ...session.user,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies AuthOptions;
