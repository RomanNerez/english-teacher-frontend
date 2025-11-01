import { auth } from '../lib/auth';
import { redirect } from "next/navigation";

export async function getAuthenticatedSession() {
  const session = await auth();

  // console.log(session);

  if (!session || session.isValidBackendToken === false) {
    redirect("/login");
  }

  return session;
}