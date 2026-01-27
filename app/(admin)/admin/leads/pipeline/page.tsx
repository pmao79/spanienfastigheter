"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
    DndContext,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { sv } from "date-fns/locale";

const COLUMNS = [
    { id: "new", title: "Ny", color: "bg-blue-50 border-blue-200" },
    { id: "contacted", title: "Kontaktad", color: "bg-yellow-50 border-yellow-200" },
    { id: "qualified", title: "Kvalificerad", color: "bg-purple-50 border-purple-200" },
    { id: "viewing_scheduled", title: "Visning", color: "bg-orange-50 border-orange-200" },
    { id: "negotiating", title: "Förhandling", color: "bg-cyan-50 border-cyan-200" },
];

export default function PipelinePage() {
    const leads = useQuery(api.leads.getPipeline);
    const updateLeadStatus = useMutation(api.leads.updateStatus);

    const [items, setItems] = useState<Record<string, any[]>>({});
    const [activeId, setActiveId] = useState<string | null>(null);
    const [draggedLead, setDraggedLead] = useState<any>(null);

    useEffect(() => {
        if (leads) {
            const grouped: Record<string, any[]> = {};
            COLUMNS.forEach(col => grouped[col.id] = []);

            leads.forEach(lead => {
                // Handle leads in statuses we don't visualize as columns (won/lost) - or mapping view_done->viewing_scheduled for simplicity?
                // Let's stick to strict column mapping for now.
                if (grouped[lead.status]) {
                    grouped[lead.status].push(lead);
                }
            });
            setItems(grouped);
        }
    }, [leads]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5 // Avoid accidental drags
            }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveId(active.id as string);
        // Find the lead object
        for (const key in items) {
            const found = items[key].find(l => l._id === active.id);
            if (found) {
                setDraggedLead(found);
                break;
            }
        }
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        const { id } = active;
        const overId = over?.id;

        if (!overId) {
            setActiveId(null);
            return;
        }

        // Identify which column we dropped into
        // The overId could be a container (column) OR an item within a container
        let newStatus = overId as string;

        // If we dropped over an item, find that item's column
        const isOverContainer = COLUMNS.some(c => c.id === overId);
        if (!isOverContainer) {
            // Find which column this item belongs to
            // But "over" logic in dnd-kit can be tricky if we don't track container of items.
            // Let's use simplified logic: If we drag into a SortableContext, we need to know the container.
            // Actually, let's just assume we drop into a column for the status update logic.
            // If we are sorting, we update order. If moving between cols, we update status.

            // Helper: find container of an item id
            const findContainer = (itemId: string) => {
                return Object.keys(items).find(key => items[key].some(i => i._id === itemId));
            };

            const overContainer = findContainer(overId as string);
            if (overContainer) newStatus = overContainer;
        }

        const currentContainer = Object.keys(items).find(key => items[key].some(i => i._id === id));

        if (currentContainer && newStatus && currentContainer !== newStatus) {
            // Optimistic update
            setItems((prev) => {
                const sourceList = [...prev[currentContainer]];
                const destList = [...(prev[newStatus] || [])];
                const itemIndex = sourceList.findIndex(i => i._id === id);
                const [movedItem] = sourceList.splice(itemIndex, 1);

                // Just push to end for now, or insert at index if we calculated it
                destList.push({ ...movedItem, status: newStatus });

                return {
                    ...prev,
                    [currentContainer]: sourceList,
                    [newStatus]: destList,
                };
            });

            // Backend update
            await updateLeadStatus({ id: id as any, status: newStatus });
        }

        setActiveId(null);
        setDraggedLead(null);
    };

    return (
        <div className="h-full space-y-4 overflow-x-auto p-2">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold text-slate-900">Pipeline</h1>
                <div className="flex gap-2">
                    <Link href="/admin/leads" className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
                        Tabellvy
                    </Link>
                </div>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="flex h-[calc(100vh-12rem)] min-w-[1000px] gap-4 pb-4">
                    {COLUMNS.map((col) => (
                        <div key={col.id} className={`flex w-72 flex-col rounded-xl bg-slate-50/50 border border-slate-100 shadow-sm ${col.color === 'bg-blue-50 border-blue-200' ? '' : ''}`}>
                            <div className={`rounded-t-xl border-b p-3 font-semibold text-slate-700 ${col.color}`}>
                                <div className="flex items-center justify-between">
                                    <span>{col.title}</span>
                                    <span className="rounded-full bg-white/50 px-2 py-0.5 text-xs text-slate-600">
                                        {items[col.id]?.length || 0}
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-2">
                                <SortableContext
                                    id={col.id}
                                    items={items[col.id]?.map(l => l._id) || []}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="flex flex-col gap-2 min-h-[100px]">
                                        {items[col.id]?.map((lead) => (
                                            <SortableItem key={lead._id} lead={lead} />
                                        ))}
                                    </div>
                                </SortableContext>
                            </div>
                        </div>
                    ))}
                </div>

                <DragOverlay>
                    {activeId && draggedLead ? (
                        <div className="w-full cursor-grabbing rounded-lg border border-slate-200 bg-white p-3 shadow-xl rotate-2">
                            <div className="flex items-start justify-between">
                                <span className="font-medium text-slate-900">{draggedLead.firstName} {draggedLead.lastName}</span>
                                <TemperatureBadge temp={draggedLead.temperature} />
                            </div>
                            <div className="mt-2 text-xs text-slate-500">
                                {draggedLead.source}
                            </div>
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}

function SortableItem({ lead }: { lead: any }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: lead._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        touchAction: "none", // Prevent scrolling while dragging (essential for dnd-kit)
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`group cursor-grab rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-all hover:shadow-md hover:border-slate-300 ${isDragging ? "cursor-grabbing" : ""}`}
        >
            <Link
                href={`/admin/leads/${lead._id}`}
                draggable={false} // Disable native link dragging to allow dnd-kit to take over
                onClick={(e) => {
                    // If we are dragging, we might want to prevent navigation?
                    // dnd-kit usually handles this via activationConstraint.
                    e.stopPropagation();
                }}
                className="block select-none" // Disable text selection
            >
                <div className="flex items-start justify-between">
                    <span className="font-medium text-slate-900 group-hover:text-[#1a365d]">{lead.firstName} {lead.lastName}</span>
                    <TemperatureBadge temp={lead.temperature} />
                </div>
                <div className="mt-1 flex flex-col gap-1">
                    <div className="text-xs text-slate-500">
                        Budget: €{lead.preferences?.minBudget || '0'} - €{lead.preferences?.maxBudget || 'Max'}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>{lead.source}</span>
                        <span>{formatDistanceToNow(lead.createdAt, { addSuffix: true, locale: sv })}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

function TemperatureBadge({ temp }: { temp: string }) {
    if (temp === "hot") return <span className="h-2 w-2 rounded-full bg-red-500 ring-2 ring-red-100" title="Hot"></span>;
    if (temp === "warm") return <span className="h-2 w-2 rounded-full bg-yellow-400 ring-2 ring-yellow-100" title="Warm"></span>;
    return <span className="h-2 w-2 rounded-full bg-blue-400 ring-2 ring-blue-100" title="Cold"></span>;
}
