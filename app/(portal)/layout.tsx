"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText } from "lucide-react";
import ConvexAuthedProvider from "@/app/ConvexAuthedProvider";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navigation = [
        { name: 'Översikt', href: '/portal', icon: LayoutDashboard },
        { name: 'Dokument', href: '/portal/documents', icon: FileText },
    ];

    return (
        <ConvexAuthedProvider>
            <div className="min-h-screen bg-slate-50">
                {/* Top Navigation */}
                <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="flex-shrink-0 flex items-center">
                                    <span className="text-xl font-serif font-bold text-slate-900">
                                        Spanienfastigheter
                                    </span>
                                </div>
                                <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                    {navigation.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive
                                                        ? 'border-blue-500 text-slate-900'
                                                        : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                                                    }`}
                                            >
                                                <item.icon className="h-4 w-4 mr-2" />
                                                {item.name}
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>
                            <div className="flex items-center">
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Mobile Nav (Bottom) */}
                <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-30 pb-safe">
                    <div className="flex justify-around">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex flex-col items-center py-3 px-2 text-xs font-medium ${isActive ? 'text-blue-600' : 'text-slate-500'
                                        }`}
                                >
                                    <item.icon className="h-6 w-6 mb-1" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 pb-24 sm:pb-6">
                    {children}
                </main>
            </div>
        </ConvexAuthedProvider>
    );
}
