"use client";

import { useState, useMemo } from "react";
import { usePaginatedQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
    Search,
    Home,
    Euro,
    MapPin,
    Star,
    List,
    Grid,
    RefreshCw,
    Eye,
    Edit,
    MoreHorizontal,
    Bed,
    Bath,
    Maximize,
    Waves,
    ArrowUpDown,
    Plus,
    Archive,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Id } from "@/convex/_generated/dataModel";

// KPI Cards Component
function PropertyKPIs({ properties }: { properties: any[] }) {
    const totalCount = properties.length;
    const avgPrice = properties.length > 0
        ? Math.round(properties.reduce((sum, p) => sum + (p.price || 0), 0) / properties.length)
        : 0;
    const featuredCount = properties.filter(p => p.isFeatured).length;

    // Group by region
    const byRegion = properties.reduce((acc: Record<string, number>, p) => {
        const region = p.region || 'Okänd';
        acc[region] = (acc[region] || 0) + 1;
        return acc;
    }, {});
    const topRegion = Object.entries(byRegion).sort((a, b) => b[1] - a[1])[0];

    // Minimalist, professional card style
    const Card = ({ label, value, subtext }: { label: string, value: string | number, subtext?: string }) => (
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm flex flex-col justify-between h-full">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">{label}</p>
            <div>
                <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
                {subtext && <p className="text-xs text-slate-400 mt-1 truncate">{subtext}</p>}
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <Card label="Totalt" value={totalCount} subtext="Publicerade objekt" />
            <Card label="Snittpris" value={`€${(avgPrice / 1000).toFixed(0)}k`} subtext="Genomsnittligt värde" />
            <Card label="Top Region" value={topRegion?.[1] || 0} subtext={topRegion?.[0] || '-'} />
            <Card label="Featured" value={featuredCount} subtext="Utvalda objekt" />
        </div>
    );
}

// Dropdown Menu Component
function ActionMenu({ propertyId, onAction }: { propertyId: Id<"properties">, onAction: (action: string, id: Id<"properties">) => void }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
                <MoreHorizontal className="w-4 h-4" />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-100 py-1 z-20">
                        <button
                            onClick={(e) => { e.stopPropagation(); onAction('preview', propertyId); setIsOpen(false); }}
                            className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                            <Eye className="w-4 h-4" /> Förhandsgranska
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onAction('archive', propertyId); setIsOpen(false); }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                            <Archive className="w-4 h-4" /> Arkivera
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

// Property Table Row Component
function PropertyTableRow({ property, onToggleFeatured, onAction }: { property: any; onToggleFeatured: (id: Id<"properties">) => void; onAction: (action: string, id: Id<"properties">) => void }) {
    const statusStyles: Record<string, any> = {
        active: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Aktiv' },
        sold: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500', label: 'Såld' },
        reserved: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Reserverad' },
        paused: { bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-400', label: 'Pausad' },
        hidden: { bg: 'bg-slate-100', text: 'text-slate-500', dot: 'bg-slate-300', label: 'Dold' },
    };

    const status = statusStyles[property.status] || { bg: 'bg-slate-100', text: 'text-slate-500', dot: 'bg-slate-300', label: property.status || 'Okänd' };

    return (
        <tr className="hover:bg-slate-50/50 transition-colors group">
            {/* Objekt */}
            <td className="px-4 py-3">
                <Link href={`/admin/properties/${property._id}`} className="flex items-center gap-3 group-hover:opacity-80 transition-opacity">
                    <div className="w-12 h-12 rounded bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                        {property.images?.[0] ? (
                            <Image
                                src={property.images[0]}
                                alt={property.town || property.ref}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <Home className="w-4 h-4" />
                            </div>
                        )}
                    </div>
                    <div className="min-w-0">
                        <div className="font-medium text-slate-900 truncate">{property.town || property.location}</div>
                        <div className="text-xs text-slate-500 truncate">{property.region}</div>
                    </div>
                </Link>
            </td>

            {/* Ref */}
            <td className="px-4 py-3">
                <span className="font-mono text-xs text-slate-500">{property.ref}</span>
            </td>

            {/* Typ */}
            <td className="px-4 py-3">
                <span className="text-sm text-slate-600">{property.type || '-'}</span>
            </td>

            {/* Egenskaper */}
            <td className="px-4 py-3">
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                    {property.bedrooms && (
                        <span className="flex items-center gap-1" title="Sovrum">
                            <Bed className="w-3 h-3" /> {property.bedrooms}
                        </span>
                    )}
                    {property.bathrooms && (
                        <span className="flex items-center gap-1" title="Badrum">
                            <Bath className="w-3 h-3" /> {property.bathrooms}
                        </span>
                    )}
                    {property.builtSize && (
                        <span className="flex items-center gap-1" title="Storlek">
                            <Maximize className="w-3 h-3" /> {property.builtSize}m²
                        </span>
                    )}
                </div>
            </td>

            {/* Pris */}
            <td className="px-4 py-3">
                <span className="font-semibold text-slate-900 text-sm">
                    {property.price ? `€${property.price.toLocaleString()}` : '-'}
                </span>
            </td>

            {/* Status */}
            <td className="px-4 py-3">
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border border-transparent ${status.bg} ${status.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    {status.label}
                </span>
            </td>

            {/* Actions */}
            <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={(e) => { e.preventDefault(); onToggleFeatured(property._id); }}
                        className={`p-1.5 rounded-md transition-colors ${property.isFeatured
                            ? 'text-amber-400 hover:bg-amber-50'
                            : 'text-slate-300 hover:text-amber-400 hover:bg-slate-100'
                            }`}
                    >
                        <Star className={`w-4 h-4 ${property.isFeatured ? 'fill-current' : ''}`} />
                    </button>
                    <Link
                        href={`/admin/properties/${property._id}`}
                        className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                        <Edit className="w-4 h-4" />
                    </Link>
                    <ActionMenu propertyId={property._id} onAction={onAction} />
                </div>
            </td>
        </tr>
    );
}

// Property Table Component
function PropertyTable({ properties, onToggleFeatured, sortBy, sortOrder, onSort, onAction }: {
    properties: any[];
    onToggleFeatured: (id: Id<"properties">) => void;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    onSort: (column: string) => void;
    onAction: (action: string, id: Id<"properties">) => void;
}) {
    return (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-200 text-left">
                            <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[300px]">Objekt</th>
                            <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700" onClick={() => onSort('ref')}>
                                <div className="flex items-center gap-1">Ref <ArrowUpDown className="w-3 h-3" /></div>
                            </th>
                            <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700" onClick={() => onSort('type')}>
                                <div className="flex items-center gap-1">Typ <ArrowUpDown className="w-3 h-3" /></div>
                            </th>
                            <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Info</th>
                            <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700" onClick={() => onSort('price')}>
                                <div className="flex items-center gap-1">Pris <ArrowUpDown className="w-3 h-3" /></div>
                            </th>
                            <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Val</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {properties.map((property) => (
                            <PropertyTableRow
                                key={property._id}
                                property={property}
                                onToggleFeatured={onToggleFeatured}
                                onAction={onAction}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Property Card Component (Mobile/Grid)
function PropertyCard({ property, onToggleFeatured, onAction }: { property: any; onToggleFeatured: (id: Id<"properties">) => void; onAction: (action: string, id: Id<"properties">) => void }) {
    const statusStyles: Record<string, any> = {
        active: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Aktiv' },
        sold: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500', label: 'Såld' },
        reserved: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Reserverad' },
        paused: { bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-400', label: 'Pausad' },
        hidden: { bg: 'bg-slate-100', text: 'text-slate-500', dot: 'bg-slate-300', label: 'Dold' },
    };

    const status = statusStyles[property.status] || { bg: 'bg-slate-100', text: 'text-slate-500', dot: 'bg-slate-300', label: property.status || 'Okänd' };

    return (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group">
            {/* Clickable Image Area */}
            <Link href={`/admin/properties/${property._id}`} className="block relative aspect-[4/3] bg-slate-100">
                {property.images?.[0] ? (
                    <Image
                        src={property.images[0]}
                        alt={property.town || property.ref}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <Home className="w-12 h-12 opacity-50" />
                    </div>
                )}

                <div className="absolute top-2 right-2 flex gap-2">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onToggleFeatured(property._id);
                        }}
                        className={`p-1.5 rounded-full backdrop-blur-md transition-colors shadow-sm ${property.isFeatured
                            ? 'bg-amber-400/90 text-white'
                            : 'bg-white/90 text-slate-400 hover:text-amber-400'
                            }`}
                    >
                        <Star className={`w-3.5 h-3.5 ${property.isFeatured ? 'fill-current' : ''}`} />
                    </button>
                </div>

                <div className="absolute bottom-2 left-2">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-semibold backdrop-blur-md shadow-sm border border-white/20 ${status.bg} ${status.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                        {status.label}
                    </span>
                </div>
            </Link>

            {/* Content */}
            <div className="p-3">
                <Link href={`/admin/properties/${property._id}`} className="block mb-3">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-slate-400">{property.ref}</span>
                        <span className="text-[10px] text-slate-400">{property.type}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 truncate leading-tight">{property.town || property.location}</h3>
                    <p className="text-xs text-slate-500 truncate">{property.region}</p>
                </Link>

                <div className="flex items-center gap-3 mb-3 text-xs text-slate-500">
                    {property.bedrooms && <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" />{property.bedrooms}</span>}
                    {property.bathrooms && <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{property.bathrooms}</span>}
                    {property.builtSize && <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" />{property.builtSize}m²</span>}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                    <div className="font-bold text-slate-900">
                        {property.price ? `€${property.price.toLocaleString()}` : '-'}
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            href={`/admin/properties/${property._id}`}
                            className="px-3 py-1.5 bg-[#1a365d] text-white text-xs font-medium rounded-md hover:bg-[#1a365d]/90 transition-colors"
                        >
                            Redigera
                        </Link>
                        <div className="relative">
                            <ActionMenu propertyId={property._id} onAction={onAction} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Property Grid Component
function PropertyGrid({ properties, onToggleFeatured, onAction }: { properties: any[]; onToggleFeatured: (id: Id<"properties">) => void; onAction: (action: string, id: Id<"properties">) => void }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {properties.map((property) => (
                <PropertyCard
                    key={property._id}
                    property={property}
                    onToggleFeatured={onToggleFeatured}
                    onAction={onAction}
                />
            ))}
        </div>
    );
}

// Main Page Component
export default function PropertiesPage() {
    const { results, status, loadMore } = usePaginatedQuery(
        api.adminProperties.getAll,
        {},
        { initialNumItems: 100 }
    );

    const toggleFeatured = useMutation(api.adminProperties.toggleFeatured);

    const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
    const [filters, setFilters] = useState({
        search: '',
        region: 'all',
        type: 'all',
        priceRange: 'all',
        status: 'all',
    });
    const [sortBy, setSortBy] = useState('_creationTime');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    // Check if mobile
    const [isMobile, setIsMobile] = useState(false);
    useState(() => {
        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth < 768);
            const handleResize = () => setIsMobile(window.innerWidth < 768);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    });

    const effectiveViewMode = isMobile ? 'grid' : viewMode;

    // Get unique regions and types
    const regions = useMemo(() => {
        return [...new Set((results || []).map(p => p.region).filter(Boolean))].sort();
    }, [results]);

    const propertyTypes = useMemo(() => {
        return [...new Set((results || []).map(p => p.type).filter(Boolean))].sort();
    }, [results]);

    // Filter and sort properties
    const filteredAndSortedProperties = useMemo(() => {
        let filtered = (results || []).filter(p => {
            // Search
            if (filters.search) {
                const search = filters.search.toLowerCase();
                const matchesSearch =
                    p.ref?.toLowerCase().includes(search) ||
                    p.town?.toLowerCase().includes(search) ||
                    p.locationDetail?.toLowerCase().includes(search) ||
                    p.region?.toLowerCase().includes(search);
                if (!matchesSearch) return false;
            }

            // Region
            if (filters.region !== 'all' && p.region !== filters.region) return false;

            // Type
            if (filters.type !== 'all' && p.type !== filters.type) return false;

            // Status
            if (filters.status !== 'all' && p.status !== filters.status) return false;

            // Price range
            if (filters.priceRange !== 'all') {
                const price = p.price || 0;
                if (filters.priceRange === '0-200000' && (price < 0 || price > 200000)) return false;
                if (filters.priceRange === '200000-400000' && (price < 200000 || price > 400000)) return false;
                if (filters.priceRange === '400000-600000' && (price < 400000 || price > 600000)) return false;
                if (filters.priceRange === '600000-1000000' && (price < 600000 || price > 1000000)) return false;
                if (filters.priceRange === '1000000+' && price < 1000000) return false;
            }

            return true;
        });

        // Sort
        filtered.sort((a, b) => {
            const aVal = a[sortBy as keyof typeof a];
            const bVal = b[sortBy as keyof typeof b];
            const modifier = sortOrder === 'asc' ? 1 : -1;
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return aVal.localeCompare(bVal) * modifier;
            }
            return ((aVal as number || 0) - (bVal as number || 0)) * modifier;
        });

        return filtered;
    }, [results, filters, sortBy, sortOrder]);

    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const handleToggleFeatured = async (id: Id<"properties">) => {
        await toggleFeatured({ id });
    };

    const handleAction = (action: string, id: Id<"properties">) => {
        // Implement actions here properly later
        console.log(`Action: ${action} on property ${id}`);
        if (action === 'preview') {
            // navigate or open modal
        }
    }

    const priceRanges = [
        { value: 'all', label: 'Alla priser' },
        { value: '0-200000', label: '< €200k' },
        { value: '200000-400000', label: '€200k - €400k' },
        { value: '400000-600000', label: '€400k - €600k' },
        { value: '600000-1000000', label: '€600k - €1M' },
        { value: '1000000+', label: '> €1M' },
    ];

    return (
        <div className="p-4 sm:p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Objekt</h1>
                    <p className="text-gray-500">Hantera fastigheter från XML-feeds</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        <span className="hidden sm:inline">Synka XML</span>
                    </button>
                    <button className="px-4 py-2 bg-[#1a365d] text-white rounded-lg text-sm font-medium hover:bg-[#2d4a7c] flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">Lägg till objekt</span>
                    </button>
                </div>
            </div>

            {/* KPIs */}
            <PropertyKPIs properties={results || []} />

            {/* Filters */}
            <div className="bg-white rounded-xl border border-slate-100 p-4 mb-6 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Sök på ref, namn, ort..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a365d]/20"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-2">
                        <select
                            value={filters.region}
                            onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d]/20"
                        >
                            <option value="all">Alla regioner</option>
                            {regions.map(region => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>

                        <select
                            value={filters.type}
                            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d]/20"
                        >
                            <option value="all">Alla typer</option>
                            {propertyTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>

                        <select
                            value={filters.priceRange}
                            onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d]/20"
                        >
                            {priceRanges.map(range => (
                                <option key={range.value} value={range.value}>{range.label}</option>
                            ))}
                        </select>

                        <select
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d]/20"
                        >
                            <option value="all">Alla statusar</option>
                            <option value="active">Aktiv</option>
                            <option value="sold">Såld</option>
                            <option value="reserved">Reserverad</option>
                            <option value="paused">Pausad</option>
                            <option value="hidden">Dold</option>
                        </select>
                    </div>

                    {/* View toggle */}
                    {!isMobile && (
                        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setViewMode('table')}
                                className={`p-2 ${viewMode === 'table' ? 'bg-[#1a365d] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 ${viewMode === 'grid' ? 'bg-[#1a365d] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                            >
                                <Grid className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Clear filters */}
                {(filters.search || filters.region !== 'all' || filters.type !== 'all' || filters.priceRange !== 'all' || filters.status !== 'all') && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                        <button
                            onClick={() => setFilters({ search: '', region: 'all', type: 'all', priceRange: 'all', status: 'all' })}
                            className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                        >
                            Rensa filter
                        </button>
                    </div>
                )}
            </div>

            {/* Content */}
            {filteredAndSortedProperties.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-slate-100">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <Home className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                        Inga objekt hittades
                    </h3>
                    <p className="text-gray-500 mb-6">
                        {filters.search || filters.region !== 'all' || filters.type !== 'all' || filters.priceRange !== 'all' || filters.status !== 'all'
                            ? 'Prova att ändra dina filter'
                            : 'Synka från XML för att importera objekt'
                        }
                    </p>
                    {(filters.search || filters.region !== 'all' || filters.type !== 'all' || filters.priceRange !== 'all' || filters.status !== 'all') && (
                        <button
                            onClick={() => setFilters({ search: '', region: 'all', type: 'all', priceRange: 'all', status: 'all' })}
                            className="px-4 py-2 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors"
                        >
                            Rensa filter
                        </button>
                    )}
                </div>
            ) : effectiveViewMode === 'table' ? (
                <PropertyTable
                    properties={filteredAndSortedProperties}
                    onToggleFeatured={handleToggleFeatured}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                    onAction={handleAction}
                />
            ) : (
                <PropertyGrid
                    properties={filteredAndSortedProperties}
                    onToggleFeatured={handleToggleFeatured}
                    onAction={handleAction}
                />
            )}
        </div>
    );
}
