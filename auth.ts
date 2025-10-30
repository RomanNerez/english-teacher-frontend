import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import "next-auth/jwt"

const providers = [
    CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            // You need to provide your own logic here that takes the credentials
            // submitted and returns either a object representing a user or value
            // that is false/null if the credentials are invalid.
            // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
            // You can also use the `req` object to obtain additional parameters
            // (i.e., the request IP address)
            const res = await fetch("/your/endpoint", {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { "Content-Type": "application/json" }
            })
            const user = await res.json()

            // If no error and we have user data, return it
            if (res.ok && user) {
                return user
            }
            // Return null if user data could not be retrieved
            return null
        }
    }),
];

export const { handlers, auth, signIn, signOut, ...test} = NextAuth({
  debug: true,
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  // adapter: UnstorageAdapter(storage),
  providers,
  basePath: "/auth",
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
    jwt({ token, trigger, session, account }) {
      if (trigger === "update") token.name = session.user.name
      if (account?.provider === "keycloak") {
        return { ...token, accessToken: account.access_token }
      }
      return token
    },
    async session({ session, token }) {
      if (token?.accessToken) session.accessToken = token.accessToken

      return session
    },
  },
  experimental: { enableWebAuthn: true },
})

console.log(handlers, auth, signIn, signOut, test, NextAuth({providers}))

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}