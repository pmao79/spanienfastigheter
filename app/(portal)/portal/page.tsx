"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { CheckCircle2, MapPin, Home, User, Phone, Mail, FileText, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const STAGES = [
    { id: "reservation", label: "Reservation" },
    { id: "contract", label: "Kontrakt" },
    { id: "due_diligence", label: "Besiktning" },
    { id: "escritura", label: "Tillträde" },
    { id: "completion", label: "Klart" },
];

export default function PortalDashboard() {
    const { user } = useUser();
    const deal = useQuery(api.deals.getMyDeal);
    const email = user?.primaryEmailAddress?.emailAddress;
    const mailings = useQuery(api.propertyMailings.getByRecipientEmail, email ? { email } : "skip");

    if (deal === undefined) {
        return <div className="p-8 text-center text-slate-500">Laddar din bostadsresa...</div>;
    }

    if (deal === null) {
        return (
            <div className="space-y-8">
                {/* Fallback for no active deal */}
                <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-sm text-center border border-slate-100">
                    <Home className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Välkommen!</h2>
                    <p className="text-slate-600">
                        Vi hittar ingen aktiv affär kopplad till din e-post ({user?.primaryEmailAddress?.emailAddress}).
                    </p>
                    <p className="text-sm text-slate-500 mt-4">
                        Kontakta din mäklare om du tror att detta är fel.
                    </p>
                </div>

                {/* Show Suggestions regardless of deal status */}
                {mailings && mailings.length > 0 && (
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-xl font-bold text-slate-900 mb-4">Förslag till dig</h2>
                        <div className="grid gap-6">
                            {mailings.map(mailing => (
                                <div key={mailing._id} className="bg-white rounded-xl border p-6 shadow-sm">
                                    <h3 className="font-bold text-lg text-[#1a365d] mb-2">{mailing.subject}</h3>
                                    <p className="text-slate-600 mb-4 whitespace-pre-line">{mailing.personalMessage}</p>

                                    {mailing.propertyIds && mailing.propertyIds.length > 0 && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                            {/* We only have IDs here. In a real app we'd fetch property details or store minimal info in mailing. 
                                                For now we link to public page.
                                            */}
                                            {mailing.propertyIds.map((pid: string) => (
                                                <Link key={pid} href={`/objekt/${pid}`} className="group block border rounded-lg overflow-hidden hover:border-[#1a365d]">
                                                    <div className="h-32 bg-slate-100 flex items-center justify-center text-slate-400">
                                                        <span className="text-xs">Visa objekt</span>
                                                    </div>
                                                    <div className="p-3">
                                                        <div className="flex items-center text-[#1a365d] text-sm font-medium gap-1 group-hover:underline">
                                                            Se detaljer <ArrowUpRight className="h-3 w-3" />
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    const currentStageIndex = STAGES.findIndex(s => s.id === deal.stage);
    const activeStageIndex = currentStageIndex === -1 ? STAGES.length : currentStageIndex;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Hej {user?.firstName || "där"}! 👋
                </h1>
                <p className="text-slate-600 mt-1">
                    Här kan du följa processen för ditt köp i {deal.property?.town}.
                </p>
            </div>

            {/* Progress */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900 mb-6">Status</h2>
                <div className="relative">
                    <div className="overflow-hidden rounded-full bg-slate-100 h-2 mb-8 absolute top-4 left-0 right-0 -z-0">
                        <div
                            className="h-full bg-green-500 transition-all duration-500"
                            style={{ width: `${(Math.max(0, currentStageIndex) / (STAGES.length - 1)) * 100}%` }}
                        />
                    </div>
                    <div className="flex justify-between relative z-10">
                        {STAGES.map((stage, index) => {
                            const isCompleted = index <= currentStageIndex;
                            const isCurrent = index === currentStageIndex;

                            return (
                                <div key={stage.id} className="flex flex-col items-center gap-2 w-20">
                                    <div className={`
                                        h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border-2
                                        ${isCompleted
                                            ? 'bg-green-500 border-green-500 text-white'
                                            : 'bg-white border-slate-200 text-slate-300'
                                        }
                                        ${isCurrent ? 'ring-4 ring-green-100' : ''}
                                    `}>
                                        {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                                    </div>
                                    <span className={`text-xs font-medium text-center ${isCurrent ? 'text-slate-900' : isCompleted ? 'text-green-600' : 'text-slate-400'
                                        }`}>
                                        {stage.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <h3 className="font-medium text-slate-900 mb-1">
                        Vad händer nu? ({STAGES[currentStageIndex]?.label || deal.stage})
                    </h3>
                    <p className="text-sm text-slate-600">
                        {deal.stage === 'completion'
                            ? "Grattis! Affären är avslutad. Nu börjar After-Sales fasen där vi hjälper dig med prenumerationer och annat."
                            : "Vi arbetar med att ta din affär framåt. Ser checklistan för aktuella steg."}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Property Card */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    {deal.property?.images?.[0] ? (
                        <div className="h-48 relative">
                            <Image
                                src={deal.property.images[0]}
                                alt={deal.property.town}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div className="h-48 bg-slate-100 flex items-center justify-center">
                            <Home className="h-12 w-12 text-slate-300" />
                        </div>
                    )}
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">
                                    {deal.property?.type} i {deal.property?.town}
                                </h3>
                                <div className="flex items-center text-slate-500 text-sm mt-1">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {deal.property?.locationDetail || deal.property?.town}
                                </div>
                            </div>
                            <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded text-xs font-medium">
                                {deal.property?.ref}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-slate-500 block">Pris</span>
                                <span className="font-medium">{deal.agreedPrice?.toLocaleString()} EUR</span>
                            </div>
                            <div>
                                <span className="text-slate-500 block">Storlek</span>
                                <span className="font-medium">{deal.property?.built} m²</span>
                            </div>
                            <div>
                                <span className="text-slate-500 block">Sovrum</span>
                                <span className="font-medium">{deal.property?.beds}</span>
                            </div>
                            <div>
                                <span className="text-slate-500 block">Badrum</span>
                                <span className="font-medium">{deal.property?.baths}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contacts Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Dina Kontakter</h3>
                    <div className="space-y-6">
                        {deal.assignedTo ? (
                            <div className="flex items-start gap-4">
                                {deal.assignedTo.avatar ? (
                                    <Image
                                        src={deal.assignedTo.avatar}
                                        alt={deal.assignedTo.name}
                                        width={48}
                                        height={48}
                                        className="h-12 w-12 rounded-full object-cover"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                        <User className="h-6 w-6" />
                                    </div>
                                )}
                                <div>
                                    <p className="font-medium text-slate-900">{deal.assignedTo.name}</p>
                                    <p className="text-sm text-slate-500 mb-2">Ansvarig Mäklare</p>
                                    <div className="space-y-1">
                                        {deal.assignedTo.email && (
                                            <a href={`mailto:${deal.assignedTo.email}`} className="flex items-center text-sm text-blue-600 hover:underline">
                                                <Mail className="h-3.5 w-3.5 mr-2" />
                                                {deal.assignedTo.email}
                                            </a>
                                        )}
                                        {deal.assignedTo.phone && (
                                            <a href={`tel:${deal.assignedTo.phone}`} className="flex items-center text-sm text-blue-600 hover:underline">
                                                <Phone className="h-3.5 w-3.5 mr-2" />
                                                {deal.assignedTo.phone}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500">Ingen mäklare tilldelad än.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* After Sales / Suggestions (Show mailings here too if active deal exists) */}
            {mailings && mailings.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Dina personliga förslag</h2>
                    <div className="grid gap-4">
                        {mailings.map(mailing => (
                            <div key={mailing._id} className="bg-white rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow">
                                <span className="text-xs text-slate-500">{new Date(mailing.createdAt).toLocaleDateString()}</span>
                                <h3 className="font-bold text-[#1a365d]">{mailing.subject}</h3>
                                <p className="text-sm text-slate-600 mt-1 line-clamp-2">{mailing.personalMessage}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
