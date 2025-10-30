import NextAuth from "next-auth";
import { authConfig } from "@/src/app/lib/auth";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };