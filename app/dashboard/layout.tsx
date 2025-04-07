import DashboardNav from "@/components/dashboard/dashboard-nav";
import { checkRole } from "@/utils/roles";
import { BarChart, Package, PenSquare, Settings, Ticket } from "lucide-react";

export default async function DashboardLayout({ children } : { children: React.ReactNode }) {
   
     const isAdmin = await checkRole('admin');

    const userLinks=[
        {
            labelEng: 'Orders',
            labelWal: 'Orders',
            path: '/dashboard/orders',
            icon: <Ticket size={16} />,
        },
        {
            labelEng: 'Settings',
            labelWal: 'Settings',
            path: '/dashboard/settings',
            icon: <Settings size={16} />,
        }
    ];

    const adminLinks= isAdmin === true ? [
        {
            labelEng: 'Analytics',
            labelWal: 'Analytics',
            path: '/dashboard/analytics',
            icon: <BarChart size={16} />,
        },
        {
            labelEng: 'Create',
            labelWal: 'Create',
            path: '/dashboard/add-event',
            icon: <PenSquare size={16} />,
        },
        {
            labelEng: 'Events',
            labelWal: 'Events',
            path: '/dashboard/events',
            icon: <Package size={16} />,
        }
    ] : [];

    const allLinks = [...adminLinks, ...userLinks];

    return (
        <div className="py-20 mx-auto">
        <DashboardNav allLinks={allLinks} />
        {children}
        </div>
    )
}


