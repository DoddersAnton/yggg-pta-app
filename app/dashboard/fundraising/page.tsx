import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";
import { getFundraising } from "@/server/actions/get-fundraising";
import FundraisingAdmin from "./fundraising-admin";

export default async function FundraisingDashboardPage() {
  const isAdmin = await checkRole("admin");
  if (!isAdmin) redirect("/dashboard/orders");

  const result = await getFundraising();
  const entries = result.success ?? [];

  return <FundraisingAdmin entries={entries} />;
}
