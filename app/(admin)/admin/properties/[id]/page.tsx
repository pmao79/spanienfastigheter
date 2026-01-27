"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, Save, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";

export default function PropertyDetailPage() {
    const params = useParams();
    const id = params.id as Id<"properties">;
    const router = useRouter();

    const property = useQuery(api.adminProperties.getById, { id });
    const updateProperty = useMutation(api.adminProperties.update);

    const [formData, setFormData] = useState({
        price: 0,
        description: "",
        internalNotes: "",
        status: "",
        isFeatured: false,
        isHidden: false
    });

    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (property) {
            setFormData({
                price: property.price,
                description: property.description || "",
                internalNotes: property.internalNotes || "",
                status: property.status || "active",
                isFeatured: property.isFeatured,
                isHidden: property.isHidden
            });
        }
    }, [property]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setIsDirty(true);
    };

    const handleSave = async () => {
        await updateProperty({
            id,
            price: Number(formData.price),
            description: formData.description,
            internalNotes: formData.internalNotes,
            status: formData.status as any,
            isFeatured: formData.isFeatured,
            isHidden: formData.isHidden
        });
        setIsDirty(false);
        alert("Sparat!");
    };

    if (!property) return <div className="p-8">Laddar...</div>;

    return (
        <div className="mx-auto max-w-5xl space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/properties" className="rounded-full bg-white p-2 text-slate-500 shadow-sm hover:text-slate-900">
                    <ArrowLeft className="h-4 w-4" />
                </Link>
                <h1 className="text-2xl font-bold text-slate-900">
                    {property.ref} - {property.type}
                </h1>
                <div className="ml-auto flex gap-2">
                    <button
                        onClick={handleSave}
                        disabled={!isDirty}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors 
                    ${isDirty ? 'bg-[#1a365d] hover:bg-[#1a365d]/90' : 'bg-slate-300 cursor-not-allowed'}`}
                    >
                        <Save className="h-4 w-4" />
                        Spara ändringar
                    </button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column: Images & Key Info */}
                <div className="space-y-6 lg:col-span-1">
                    <div className="aspect-video relative overflow-hidden rounded-xl bg-slate-100">
                        {property.images?.[0] && (
                            <Image src={property.images[0]} alt={property.ref} fill className="object-cover" />
                        )}
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <h3 className="mb-4 font-medium text-slate-900">Status & Synlighet</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-0 bg-slate-50 py-2 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-[#1a365d] sm:text-sm sm:leading-6"
                                >
                                    <option value="active">Active</option>
                                    <option value="reserved">Reserved</option>
                                    <option value="sold">Sold</option>
                                    <option value="paused">Paused</option>
                                    <option value="hidden">Hidden</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="isFeatured"
                                    name="isFeatured"
                                    checked={formData.isFeatured}
                                    onChange={handleChange}
                                    className="h-4 w-4 rounded border-slate-300 text-[#1a365d] focus:ring-[#1a365d]"
                                />
                                <label htmlFor="isFeatured" className="text-sm text-slate-700">Utvald (Featured)</label>
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="isHidden"
                                    name="isHidden"
                                    checked={formData.isHidden}
                                    onChange={handleChange}
                                    className="h-4 w-4 rounded border-slate-300 text-[#1a365d] focus:ring-[#1a365d]"
                                />
                                <label htmlFor="isHidden" className="text-sm text-slate-700">Dold från hemsidan</label>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <h3 className="mb-4 font-medium text-slate-900">XML Data</h3>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-slate-500">Ref</dt>
                                <dd className="font-mono text-slate-900">{property.ref}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-slate-500">Extern ID</dt>
                                <dd className="font-mono text-slate-900">{property.externalId}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-slate-500">Senast uppdaterad</dt>
                                <dd className="text-slate-900">{new Date(property.updatedAt).toLocaleDateString()}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Right Column: Editable Fields */}
                <div className="space-y-6 lg:col-span-2">
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <h3 className="mb-4 font-medium text-slate-900">Redigera information</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Pris (EUR)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-0 bg-slate-50 py-2 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-[#1a365d] sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700">Beskrivning (Override)</label>
                                <p className="mb-2 text-xs text-slate-500">Om lämnad tom används XML-beskrivningen.</p>
                                <textarea
                                    name="description"
                                    rows={8}
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 bg-slate-50 py-2 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-[#1a365d] sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700">Interna anteckningar</label>
                                <textarea
                                    name="internalNotes"
                                    rows={4}
                                    value={formData.internalNotes}
                                    onChange={handleChange}
                                    placeholder="Anteckningar för teamet..."
                                    className="block w-full rounded-md border-0 bg-yellow-50 py-2 text-slate-900 ring-1 ring-inset ring-yellow-200 focus:ring-2 focus:ring-yellow-400 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <h3 className="mb-4 font-medium text-slate-900">Original Data</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="block text-slate-500">Sovrum</span>
                                <span className="font-medium">{property.beds}</span>
                            </div>
                            <div>
                                <span className="block text-slate-500">Badrum</span>
                                <span className="font-medium">{property.baths}</span>
                            </div>
                            <div>
                                <span className="block text-slate-500">Byggyta</span>
                                <span className="font-medium">{property.built} m²</span>
                            </div>
                            <div>
                                <span className="block text-slate-500">Tomt</span>
                                <span className="font-medium">{property.plot || '-'} m²</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
