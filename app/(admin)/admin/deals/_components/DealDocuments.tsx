"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useState, useRef } from "react";
import { FileText, Upload, Trash2, ExternalLink, File, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface DealDocumentsProps {
    dealId: Id<"deals">;
    uploadedById: Id<"users">; // Current user
}

export default function DealDocuments({ dealId, uploadedById }: DealDocumentsProps) {
    const documents = useQuery(api.documents.getByDeal, { dealId });
    const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
    const createDocument = useMutation(api.documents.create);
    const deleteDocument = useMutation(api.documents.deleteDocument);

    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);

            // 1. Get upload URL
            const postUrl = await generateUploadUrl();

            // 2. Upload file
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });
            const { storageId } = await result.json();

            // 3. Save metadata
            await createDocument({
                dealId,
                name: file.name,
                type: "other", // Default to other, could add type selector modal
                storageId,
                mimeType: file.type,
                size: file.size,
                uploadedById,
                isPublicToCustomer: false,
                requiresSignature: false,
            });

        } catch (error) {
            console.error("Upload failed:", error);
            alert("Uppladdning misslyckades. Försök igen.");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleDelete = async (id: Id<"documents">) => {
        if (confirm("Är du säker på att du vill ta bort detta dokument?")) {
            await deleteDocument({ id });
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    if (!documents) return <div className="p-4 text-center text-slate-500">Laddar dokument...</div>;

    return (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 bg-slate-50 p-4 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Dokument
                </h3>
                <div className="relative">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                    >
                        {isUploading ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                            <Upload className="h-3.5 w-3.5" />
                        )}
                        {isUploading ? "Laddar upp..." : "Ladda upp"}
                    </button>
                </div>
            </div>

            {documents.length === 0 ? (
                <div className="p-8 text-center">
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                        <File className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium text-slate-900">Inga dokument</p>
                    <p className="text-xs text-slate-500 mt-1">Ladda upp kontrakt, ID-handlingar mm.</p>
                </div>
            ) : (
                <div className="divide-y divide-slate-100">
                    {documents.map((doc) => (
                        <div key={doc._id} className="group flex items-center justify-between p-3 hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-blue-50 text-blue-600">
                                    <FileText className="h-4 w-4" />
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-slate-900" title={doc.name}>
                                        {doc.name}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {formatFileSize(doc.size)} • {format(new Date(doc.createdAt), "d MMM yyyy")}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => window.open(doc.url || '', '_blank')} // Need url field from storage
                                    className="rounded p-1 text-slate-400 hover:bg-white hover:text-blue-600 hover:shadow-sm"
                                    title="Öppna"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(doc._id)}
                                    className="rounded p-1 text-slate-400 hover:bg-white hover:text-red-600 hover:shadow-sm"
                                    title="Ta bort"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
