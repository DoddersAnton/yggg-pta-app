import DashboardNav from "@/components/dashboard/dashboard-nav";
import { checkRole } from "@/utils/roles";
import { BarChart, Package, PenSquare, Ticket } from "lucide-react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isAdmin = await checkRole("admin");

  const userLinks = [
    {
      labelEng: "Orders",
      labelWal: "Archebion",
      path: "/dashboard/orders",
      icon: <Ticket size={15} />,
    },
  ];

  const adminLinks = isAdmin
    ? [
        {
          labelEng: "Analytics",
          labelWal: "Dadansoddeg",
          path: "/dashboard/analytics",
          icon: <BarChart size={15} />,
        },
        {
          labelEng: "Create Event",
          labelWal: "Creu Digwyddiad",
          path: "/dashboard/add-event",
          icon: <PenSquare size={15} />,
        },
        {
          labelEng: "Manage Events",
          labelWal: "Rheoli Digwyddiadau",
          path: "/dashboard/events",
          icon: <Package size={15} />,
        },
      ]
    : [];

  const allLinks = [...adminLinks, ...userLinks];

  return (
    <div className="bg-purple-50 min-h-screen pt-16">
      <DashboardNav allLinks={allLinks} />
      <div className="max-w-6xl mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
