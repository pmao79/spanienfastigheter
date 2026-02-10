"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, User, Mail, Calendar, CheckCircle2, Clock, MousePointer2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { sv } from "date-fns/locale";

export default function MailingDetailPage() {
    const params = useParams();
    const mailingId = params.id as any;
    const mailing = useQuery(api.propertyMailings.getById, { id: mailingId });

    if (mailing === undefined) return <div className="p-10 text-center">Laddar...</div>;
    if (mailing === null) return <div className="p-10 text-center">Utskicket hittades inte.</div>;

    const timeline = [
        { status: 'created', label: 'Skapad', date: mailing.createdAt, icon: Calendar },
        { status: 'scheduled', label: 'Schemalagd', date: mailing.scheduledAt, icon: Clock },
        { status: 'sent', label: 'Skickad', date: mailing.sentAt, icon: Mail },
        { status: 'opened', label: 'Öppnad', date: mailing.openedAt, icon: CheckCircle2 },
        { status: 'clicked', label: 'Klickad', date: mailing.clickedAt, icon: MousePointer2 },
    ].filter(step => step.date); // Only show steps that happened

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-start justify-between">
                <div>
                    <Link href="/admin/mailings" className="flex items-center text-sm text-slate-500 hover:text-[#1a365d] mb-4">
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Tillbaka till listan
                    </Link>
                    <h1 className="text-2xl font-bold text-[#1a365d]">{mailing.subject}</h1>
                    <p className="text-slate-500">Mottagare: {mailing.recipientName} ({mailing.recipientEmail})</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize 
                        ${mailing.status === 'sent' ? 'bg-green-100 text-green-700' :
                            mailing.status === 'draft' ? 'bg-slate-100 text-slate-600' : 'bg-blue-100 text-blue-700'
                        }`}>
                        {mailing.status}
                    </span>
                    {mailing.sentAt && (
                        <span className="text-sm text-slate-500">
                            Skickades {formatDistanceToNow(new Date(mailing.sentAt), { addSuffix: true, locale: sv })}
                        </span>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Content Preview */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-lg shadow-sm border p-8">
                        <h2 className="text-lg font-semibold mb-4 text-slate-900 border-b pb-2">Innehåll</h2>

                        <div className="prose prose-slate max-w-none mb-8">
                            <p className="whitespace-pre-line text-slate-700">{mailing.personalMessage}</p>
                        </div>

                        {mailing.properties && mailing.properties.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="font-medium text-slate-900">Inkluderade objekt</h3>
                                <div className="grid gap-4">
                                    {mailing.properties.map((p: any) => (
                                        <div key={p._id} className="flex gap-4 border rounded-lg p-3 hover:bg-slate-50 transition-colors">
                                            {p.images?.[0] ? (
                                                <div className="relative w-20 h-20 rounded-md overflow-hidden">
                                                    <Image
                                                        src={p.images[0]}
                                                        alt={p.town || 'Fastighet'}
                                                        fill
                                                        sizes="80px"
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-20 h-20 bg-slate-100 rounded-md flex items-center justify-center text-xs text-slate-400">No Img</div>
                                            )}
                                            <div>
                                                <h4 className="font-bold text-[#1a365d]">{p.type} i {p.town}</h4>
                                                <p className="text-sm text-slate-600">{Number(p.price).toLocaleString()} €</p>
                                                <p className="text-xs text-slate-500 mt-1">{p.beds} sov • {p.baths} bad • {p.built} m²</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Meta & Timeline */}
                <div className="space-y-6">
                    {/* Activity Timeline */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold text-slate-900 mb-4">Händelselogg</h3>
                        <div className="space-y-4">
                            {timeline.map((event, idx) => (
                                <div key={event.status} className="flex gap-3 relative">
                                    {/* Line */}
                                    {idx < timeline.length - 1 && (
                                        <div className="absolute left-2.5 top-8 bottom-[-16px] w-[1px] bg-slate-200" />
                                    )}

                                    <div className={`
                                        h-5 w-5 rounded-full flex items-center justify-center shrink-0 z-10 mt-0.5
                                        ${event.status === 'sent' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}
                                    `}>
                                        <event.icon className="h-3 w-3" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">{event.label}</p>
                                        <p className="text-xs text-slate-500">
                                            {new Date(event.date!).toLocaleString('sv-SE')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {timeline.length === 0 && (
                                <p className="text-sm text-slate-500 italic">Ingen aktivitet än.</p>
                            )}
                        </div>
                    </div>

                    {/* Sender Info */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold text-slate-900 mb-4">Avsändare</h3>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                <User className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-900">{mailing.createdByUser?.name || "Okänd"}</p>
                                <p className="text-xs text-slate-500">{mailing.createdByUser?.email}</p>
                            </div>
                        </div>
                        {mailing.resendMessageId && (
                            <div className="mt-4 pt-4 border-t">
                                <p className="text-xs text-slate-400">Message ID</p>
                                <p className="text-xs font-mono text-slate-600 break-all">{mailing.resendMessageId}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
