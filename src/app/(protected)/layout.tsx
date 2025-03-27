"server only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/utils/auth";

export default async function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Pass the headers to the auth API
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect if no session is found
  if (!session) {
    redirect("/login");
  }

  // Return the children wrapped in a fragment
  return <>{children}</>;
}
