'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Plus, User, Shield, Mail } from 'lucide-react';
import Image from 'next/image';

export default function TeamPage() {
    const users = useQuery(api.users.getAll);
    const setRole = useMutation(api.users.setRole);

    const handleRoleChange = async (id: any, newRole: string) => {
        try {
            await setRole({ id, role: newRole as any });
        } catch (error) {
            console.error(error);
            alert('Misslyckades med att ändra roll.');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="text-2xl font-bold text-slate-800">Team & Användare</h1>
                <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                    <Plus size={18} />
                    Bjud in medlem
                </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500">
                        <tr>
                            <th className="px-6 py-4 font-medium">Användare</th>
                            <th className="px-6 py-4 font-medium">Roll</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Datum</th>
                            <th className="px-6 py-4 font-medium text-right">Åtgärder</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {!users ? (
                            <tr><td colSpan={5} className="p-6 text-center text-slate-500">Laddar...</td></tr>
                        ) : users.map((u: any) => (
                            <tr key={u._id} className="hover:bg-slate-50/50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-slate-200">
                                            {u.avatar ? (
                                                <Image src={u.avatar} alt={u.name} fill className="object-cover" />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-slate-400">
                                                    <User size={20} />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">{u.name}</div>
                                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                                <Mail size={12} /> {u.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <select
                                        value={u.role}
                                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                        className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 focus:border-blue-500 focus:outline-none"
                                    >
                                        <option value="owner">Owner</option>
                                        <option value="admin">Admin</option>
                                        <option value="agent">Agent</option>
                                        <option value="sales_partner">Sales Partner</option>
                                        <option value="referral">Referral</option>
                                        <option value="customer">Customer</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${u.isActive ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                        {u.isActive ? 'Aktiv' : 'Inaktiv'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-500">
                                    {new Date(u.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-red-600">
                                        Inaktivera
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
