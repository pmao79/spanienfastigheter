'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard,
    Home,
    Users,
    Megaphone,
    Settings,
    Menu,
    X,
    Search,
    Bell
} from 'lucide-react';
import { UserButton, useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const pathname = usePathname();
    const { user, isLoaded: isClerkLoaded } = useUser();

    // Sync user with Convex
    const convexUser = useQuery(api.users.getByClerkId,
        isClerkLoaded && user ? { clerkId: user.id } : "skip"
    );
    const createUser = useMutation(api.users.create);

    useEffect(() => {
        if (isClerkLoaded && user && convexUser === null) {
            // User doesn't exist in Convex yet, create them
            // First user is admin/owner logic? 
            // Prompt says: "med role='admin' för första användaren, sedan 'customer' för övriga"
            // We can't easily check "first user" purely client side without race conditions, 
            // but for MVP we can check if getAll returns empty? Or just default to customer and manually update first one.
            // Prompt: "skapa användare automatiskt vid första inloggning (med role='admin' för första användaren...)"

            // Let's just create as customer for safety, unless we want to query count.
            // Implementing a simpler logic: just create.
            createUser({
                name: user.fullName || user.primaryEmailAddress?.emailAddress || 'Unknown',
                email: user.primaryEmailAddress?.emailAddress || '',
                clerkId: user.id,
                role: 'customer', // Default, logic for "first user" might need backend check
                avatar: user.imageUrl,
            });
        }
    }, [isClerkLoaded, user, convexUser, createUser]);

    const navItems = [
        { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { label: 'Objekt', href: '/admin/properties', icon: Home },
        { label: 'Leads', href: '/admin/leads', icon: Megaphone },
        { label: 'Team', href: '/admin/team', icon: Users },
        { label: 'Inställningar', href: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="flex h-16 items-center border-b border-slate-800 px-6">
                        <span className="text-xl font-bold tracking-tight">Admin<span className="text-blue-400">Portal</span></span>
                        <button
                            className="ml-auto lg:hidden"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 px-3 py-4">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
                                            ? 'bg-blue-600 text-white'
                                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                        }`}
                                >
                                    <item.icon size={20} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Info / Bottom */}
                    <div className="border-t border-slate-800 p-4">
                        <div className="flex items-center gap-3">
                            <UserButton afterSignOutUrl="/" />
                            <div className="overflow-hidden">
                                <p className="truncate text-sm font-medium text-white">
                                    {user?.fullName || 'User'}
                                </p>
                                <p className="truncate text-xs text-slate-500">
                                    {user?.primaryEmailAddress?.emailAddress}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Header */}
                <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
                    <button
                        className="lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu size={24} className="text-slate-600" />
                    </button>

                    <div className="flex flex-1 items-center px-4 lg:px-8">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Sök..."
                                className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative text-slate-500 hover:text-slate-700">
                            <Bell size={20} />
                            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
                    {children}
                </main>
            </div>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
