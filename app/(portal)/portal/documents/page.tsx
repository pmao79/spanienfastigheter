"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FileText, Download, ExternalLink, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function PortalDocumentsPage() {
    const documents = useQuery(api.documents.getMyDocuments);

    if (documents === undefined) {
        return <div className="p-8 text-center text-slate-500">Laddar dokument...</div>;
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Mina Dokument</h1>
                <p className="text-slate-600 mt-1">
                    Här hittar du kontrakt och viktiga filer kopplade till ditt köp.
                </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {documents.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                            <FileText className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">Inga dokument än</h3>
                        <p className="text-slate-500 mt-1">
                            Din mäklare har inte delat några dokument med dig än.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {documents.map((doc) => (
                            <div key={doc._id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-slate-900">{doc.name}</h3>
                                        <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                                            <span>{formatFileSize(doc.size)}</span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {format(new Date(doc.createdAt), "d MMM yyyy")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => window.open(doc.url || '', '_blank')}
                                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                                >
                                    <Download className="h-4 w-4" />
                                    <span className="hidden sm:inline">Ladda ner</span>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
