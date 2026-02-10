import AdminShell from "./_components/AdminShell";
import ConvexAuthedProvider from "@/app/ConvexAuthedProvider";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ConvexAuthedProvider>
            <AdminShell>
                {children}
            </AdminShell>
        </ConvexAuthedProvider>
    );
}
