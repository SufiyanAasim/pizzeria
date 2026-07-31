import { redirect } from "next/navigation";
import { isAdminSession } from "@/lib/admin-auth";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAdminSession();
  if (!authed) {
    redirect("/admin/login");
  }
  return <>{children}</>;
}
