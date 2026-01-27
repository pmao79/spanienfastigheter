"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { CheckSquare, Calendar, User, ArrowRight, Filter, Plus } from "lucide-react";

export default function TasksPage() {
    const tasks = useQuery(api.tasks.getAll); // Could optimize with filters on backend
    const updateTaskStatus = useMutation(api.tasks.updateStatus);
    // const createTask = useMutation(api.tasks.create);

    const [filter, setFilter] = useState<"all" | "todo" | "done">("todo");

    const filteredTasks = tasks?.filter(t => {
        if (filter === "all") return true;
        if (filter === "todo") return t.status !== "done" && t.status !== "cancelled";
        if (filter === "done") return t.status === "done";
        return true;
    });

    return (
        <div className="mx-auto max-w-5xl space-y-6 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">Uppgifter</h1>
                <button className="flex items-center gap-2 rounded-lg bg-[#1a365d] px-4 py-2 text-sm font-medium text-white hover:bg-[#153e75]">
                    <Plus className="h-4 w-4" /> Ny uppgift
                </button>
            </div>

            <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                <button
                    onClick={() => setFilter("todo")}
                    className={`text-sm font-medium ${filter === "todo" ? "text-[#1a365d]" : "text-slate-500 hover:text-slate-700"}`}
                >
                    Att göra
                </button>
                <button
                    onClick={() => setFilter("done")}
                    className={`text-sm font-medium ${filter === "done" ? "text-[#1a365d]" : "text-slate-500 hover:text-slate-700"}`}
                >
                    Avklarade
                </button>
                <button
                    onClick={() => setFilter("all")}
                    className={`text-sm font-medium ${filter === "all" ? "text-[#1a365d]" : "text-slate-500 hover:text-slate-700"}`}
                >
                    Alla
                </button>
            </div>

            <div className="space-y-2">
                {filteredTasks?.map((task) => (
                    <div key={task._id} className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:border-blue-300">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => updateTaskStatus({ id: task._id, status: task.status === 'done' ? 'todo' : 'done' })}
                                className={`flex h-6 w-6 items-center justify-center rounded border transition-colors ${task.status === 'done' ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 hover:border-[#1a365d]'
                                    }`}
                            >
                                {task.status === 'done' && <CheckSquare className="h-4 w-4" />}
                            </button>
                            <div>
                                <h3 className={`font-medium ${task.status === 'done' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                                    {task.title}
                                </h3>
                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                    {task.dueAt && (
                                        <span className={`flex items-center gap-1 ${new Date(task.dueAt) < new Date() && task.status !== 'done' ? 'text-red-500 font-medium' : ''}`}>
                                            <Calendar className="h-3 w-3" />
                                            {format(new Date(task.dueAt), "d MMM", { locale: sv })}
                                        </span>
                                    )}
                                    {task.leadId && (
                                        <span className="flex items-center gap-1 text-blue-600">
                                            LEAD <ArrowRight className="h-3 w-3" />
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            {/* Assignee avatar or initials could go here */}
                            {task.priority === 'urgent' && <span className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-700">Brådskande</span>}
                            {task.priority === 'high' && <span className="rounded bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">Hög</span>}
                        </div>
                    </div>
                ))}
                {filteredTasks?.length === 0 && (
                    <p className="py-12 text-center text-slate-500">Inga uppgifter hittades.</p>
                )}
            </div>
        </div>
    );
}
