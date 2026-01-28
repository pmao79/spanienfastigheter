"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
    Users,
    MoreHorizontal,
    Shield,
    UserX,
    UserCheck,
    Mail,
    Plus
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { getRoleLabel } from "@/lib/permissions";

export default function TeamPage() {
    const users = useQuery(api.users.getAll);
    const setRole = useMutation(api.users.setRole);
    const deactivate = useMutation(api.users.deactivate);
    const reactivate = useMutation(api.users.reactivate);

    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    // Quick inline role change
    const handleRoleChange = async (userId: any, newRole: string) => {
        await setRole({ userId: userId, role: newRole as any });
    };

    const handleToggleActive = async (user: any) => {
        if (user.isActive) {
            if (confirm("Är du säker på att du vill inaktivera denna användare?")) {
                await deactivate({ userId: user._id });
            }
        } else {
            await reactivate({ userId: user._id });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="text-2xl font-bold text-slate-900">Team & Användare</h1>
                <button
                    onClick={() => setIsInviteModalOpen(true)}
                    className="flex items-center gap-2 rounded-lg bg-[#1a365d] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a365d]/90"
                >
                    <Plus className="h-4 w-4" />
                    Bjud in
                </button>
            </div>

            <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Användare</th>
                                <th className="px-6 py-4 font-medium">Email</th>
                                <th className="px-6 py-4 font-medium">Roll</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users?.map(user => (
                                <tr key={user._id} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-200">
                                                {user.avatar ? (
                                                    <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                                                        <Users className="h-5 w-5" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="font-medium text-slate-900">{user.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                            className="rounded-md border-0 bg-slate-50 py-1 pl-2 pr-8 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-[#1a365d]"
                                        >
                                            <option value="owner">Owner</option>
                                            <option value="admin">Admin</option>
                                            <option value="agent">Agent</option>
                                            <option value="sales_partner">Sales Partner</option>
                                            <option value="customer">Customer</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.isActive ? (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                                                Active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">
                                                Inactive
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleToggleActive(user)}
                                            className="text-slate-400 hover:text-slate-600"
                                            title={user.isActive ? "Inaktivera" : "Aktivera"}
                                        >
                                            {user.isActive ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Invite Modal */}
            {isInviteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900">Skapa ny användare</h2>
                            <button onClick={() => setIsInviteModalOpen(false)} className="rounded-full p-2 text-slate-400 hover:bg-slate-50">
                                <UserX className="h-5 w-5" />
                            </button>
                        </div>

                        <InviteForm onClose={() => setIsInviteModalOpen(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}

function InviteForm({ onClose }: { onClose: () => void }) {
    const createUser = useMutation(api.users.create);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "agent"
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMsg("");

        try {
            await createUser({
                name: formData.name,
                email: formData.email,
                role: formData.role,
                clerkId: "pending_invite_" + Date.now(), // Placeholder until signup as any
            });
            onClose();
            alert("Användare skapad! De kan nu logga in med denna email för att få tillgång.");
        } catch (error: any) {
            console.error("Failed to create user:", error);
            setStatus("error");
            setErrorMsg(error.message || "Ett okänt fel uppstod.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Namn</label>
                <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border-slate-200 focus:border-[#1a365d] focus:ring-[#1a365d]"
                    placeholder="Förnamn Efternamn"
                />
            </div>
            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border-slate-200 focus:border-[#1a365d] focus:ring-[#1a365d]"
                    placeholder="namn@foretag.se"
                />
            </div>
            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Roll</label>
                <select
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                    className="w-full rounded-lg border-slate-200 focus:border-[#1a365d] focus:ring-[#1a365d]"
                >
                    <option value="agent">Agent</option>
                    <option value="sales_partner">Sales Partner</option>
                    <option value="admin">Admin</option>
                    <option value="owner">Owner</option>
                </select>
            </div>

            {status === "error" && (
                <p className="text-sm text-red-600">{errorMsg}</p>
            )}

            <div className="flex justify-end gap-3 pt-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                    Avbryt
                </button>
                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="rounded-lg bg-[#1a365d] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a365d]/90 disabled:opacity-50"
                >
                    {status === "submitting" ? "Skapar..." : "Skapa Användare"}
                </button>
            </div>
        </form>
    );
}
