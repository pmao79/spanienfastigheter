'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  MapPin,
  ChevronDown,
  Home,
  Palmtree,
  Waves,
  Sun,
  Building2,
  Coins,
  Plus,
  Minus,
  Check,
} from 'lucide-react';

export default function Hero() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'buy' | 'new'>('buy');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // States for dropdowns
  const [openDropdown, setOpenDropdown] = useState<
    'location' | 'type' | 'price' | null
  >(null);

  // Selection states
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedType, setSelectedType] = useState('Alla typer');
  const [selectedPrice, setSelectedPrice] = useState('Valfritt pris');

  // Close dropdowns when clicking outside
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (dropdown: 'location' | 'type' | 'price') => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const selectOption = (
    type: 'location' | 'type' | 'price',
    value: string
  ) => {
    if (type === 'location') setSelectedRegion(value);
    if (type === 'type') setSelectedType(value);
    if (type === 'price') setSelectedPrice(value);
    setOpenDropdown(null);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedRegion && selectedRegion !== 'Hela Spanien') {
      params.set(
        'region',
        selectedRegion === 'Costa del Sol' ? 'costa-del-sol' : 'costa-blanca'
      );
    }
    if (selectedType !== 'Alla typer') {
      params.set('type', selectedType.toLowerCase());
    }
    if (activeTab === 'new') {
      params.set('newBuild', 'true');
    }
    router.push(`/fastigheter?${params.toString()}`);
  };

  return (
    <div className="relative min-h-screen md:h-[95vh] w-full flex flex-col justify-start md:justify-center items-center bg-navy overflow-hidden pt-32 md:pt-0">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://morganlawgroup.com/wp-content/uploads/2022/02/multi-gen-family-beach-1024x674.jpg"
          alt="Tre generationer av en familj blickar ut över havet i solnedgången"
          className="w-full h-full object-cover opacity-90 scale-105 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-navy/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-navy/40" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center">
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-[1.05] text-center drop-shadow-lg tracking-tight">
          Hitta hemmet där <br />
          <span className="italic font-light text-alabaster/90">
            hjärtat landar
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-light leading-relaxed text-center antialiased opacity-90">
          Vi guidar dig genom Costa Blancas och Costa del Sols mest
          eftertraktade områden. Från första visning till första doppet i
          poolen.
        </p>

        {/* --- SEARCH INTERFACE --- */}
        <div
          ref={searchContainerRef}
          className="w-full max-w-5xl mx-auto bg-white rounded-md shadow-2xl transition-all duration-300 relative"
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('buy')}
              className={`flex-1 py-4 md:py-5 text-xs md:text-sm uppercase tracking-[0.15em] font-semibold transition-colors flex items-center justify-center gap-2 ${activeTab === 'buy' ? 'bg-white text-navy' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
            >
              <Home size={16} className="mb-0.5" />
              Alla Bostäder
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`flex-1 py-4 md:py-5 text-xs md:text-sm uppercase tracking-[0.15em] font-semibold transition-colors flex items-center justify-center gap-2 ${activeTab === 'new' ? 'bg-white text-navy' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
            >
              <Building2 size={16} className="mb-0.5" />
              Nyproduktion
            </button>
          </div>

          {/* Main Search Layout */}
          <div className="flex flex-col md:grid md:grid-cols-12 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100 p-2 relative">
            {/* Location Selector */}
            <div
              className="md:col-span-4 p-4 hover:bg-greige/30 transition-colors cursor-pointer group relative"
              onClick={() => toggleDropdown('location')}
            >
              <label className="text-[10px] uppercase tracking-[0.2em] text-sage font-bold mb-1 block group-hover:text-navy transition-colors">
                Var vill du bo?
              </label>
              <div className="flex items-center justify-between">
                <div className="text-navy font-serif text-lg truncate pr-2">
                  {selectedRegion || 'Välj område'}
                </div>
                <MapPin
                  size={18}
                  className="text-gray-300 group-hover:text-sand transition-colors"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1 font-light truncate">
                Costa Blanca & Costa del Sol
              </p>

              {/* Location Dropdown */}
              {openDropdown === 'location' && (
                <div className="absolute top-full left-0 w-full bg-white shadow-xl border border-gray-100 rounded-b-sm z-50 animate-fade-in mt-2 md:mt-0">
                  <div className="p-2 space-y-1">
                    {['Hela Spanien', 'Costa del Sol', 'Costa Blanca'].map(
                      (loc) => (
                        <button
                          key={loc}
                          onClick={(e) => {
                            e.stopPropagation();
                            selectOption('location', loc);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-greige/30 text-navy font-medium text-sm rounded-sm flex justify-between items-center"
                        >
                          {loc}
                          {selectedRegion === loc && (
                            <Check size={14} className="text-sage" />
                          )}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Property Type Selector */}
            <div
              className="md:col-span-3 p-4 hover:bg-greige/30 transition-colors cursor-pointer group relative"
              onClick={() => toggleDropdown('type')}
            >
              <label className="text-[10px] uppercase tracking-[0.2em] text-sage font-bold mb-1 block group-hover:text-navy transition-colors">
                Typ av bostad
              </label>
              <div className="flex items-center justify-between">
                <div className="text-navy font-serif text-lg">
                  {selectedType}
                </div>
                <ChevronDown
                  size={18}
                  className="text-gray-300 group-hover:text-navy transition-colors"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1 font-light">
                Villa, Lägenhet, Takvåning...
              </p>

              {/* Type Dropdown */}
              {openDropdown === 'type' && (
                <div className="absolute top-full left-0 w-full bg-white shadow-xl border border-gray-100 rounded-b-sm z-50 animate-fade-in mt-2 md:mt-0">
                  <div className="p-2 space-y-1">
                    {[
                      'Alla typer',
                      'Villa',
                      'Lägenhet',
                      'Radhus',
                      'Takvåning',
                    ].map((type) => (
                      <button
                        key={type}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectOption('type', type);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-greige/30 text-navy font-medium text-sm rounded-sm flex justify-between items-center"
                      >
                        {type}
                        {selectedType === type && (
                          <Check size={14} className="text-sage" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Price Selector */}
            <div
              className="md:col-span-3 p-4 hover:bg-greige/30 transition-colors cursor-pointer group relative"
              onClick={() => toggleDropdown('price')}
            >
              <label className="text-[10px] uppercase tracking-[0.2em] text-sage font-bold mb-1 block group-hover:text-navy transition-colors">
                Din budget
              </label>
              <div className="flex items-center justify-between">
                <div className="text-navy font-serif text-lg">
                  {selectedPrice}
                </div>
                <Coins
                  size={18}
                  className="text-gray-300 group-hover:text-sand transition-colors"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1 font-light">
                Maxpris i Euro (€)
              </p>

              {/* Price Dropdown */}
              {openDropdown === 'price' && (
                <div className="absolute top-full left-0 w-full bg-white shadow-xl border border-gray-100 rounded-b-sm z-50 animate-fade-in mt-2 md:mt-0">
                  <div className="p-2 space-y-1 max-h-60 overflow-y-auto">
                    {[
                      'Valfritt pris',
                      '€ 150 000',
                      '€ 250 000',
                      '€ 350 000',
                      '€ 500 000',
                      '€ 750 000',
                      '€ 1 000 000+',
                    ].map((price) => (
                      <button
                        key={price}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectOption('price', price);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-greige/30 text-navy font-medium text-sm rounded-sm flex justify-between items-center"
                      >
                        {price}
                        {selectedPrice === price && (
                          <Check size={14} className="text-sage" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Search Button */}
            <div className="md:col-span-2 p-2">
              <button
                onClick={handleSearch}
                className="w-full h-14 md:h-full bg-navy text-white rounded-sm hover:bg-charcoal transition-all duration-300 flex flex-row md:flex-col items-center justify-center gap-2 shadow-lg group"
              >
                <Search
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="uppercase tracking-[0.15em] text-xs font-semibold">
                  Sök
                </span>
              </button>
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <div className="border-t border-gray-100 bg-gray-50/50 px-4 md:px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide mask-fade-right">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold whitespace-nowrap hidden md:block">
                Snabba val:
              </span>

              <label className="flex items-center gap-2 cursor-pointer group flex-shrink-0">
                <div className="w-4 h-4 rounded-sm border border-gray-300 bg-white flex items-center justify-center group-hover:border-navy transition-colors" />
                <span className="text-xs text-charcoal font-medium group-hover:text-navy flex items-center gap-1.5 transition-colors">
                  <Waves size={14} className="text-sand" /> Havsutsikt
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer group flex-shrink-0">
                <div className="w-4 h-4 rounded-sm border border-gray-300 bg-white flex items-center justify-center group-hover:border-navy transition-colors" />
                <span className="text-xs text-charcoal font-medium group-hover:text-navy flex items-center gap-1.5 transition-colors">
                  <Palmtree size={14} className="text-sand" /> Pool
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer group flex-shrink-0">
                <div className="w-4 h-4 rounded-sm border border-gray-300 bg-white flex items-center justify-center group-hover:border-navy transition-colors" />
                <span className="text-xs text-charcoal font-medium group-hover:text-navy flex items-center gap-1.5 transition-colors">
                  <Sun size={14} className="text-sand" /> Turistlicens
                </span>
              </label>
            </div>

            <button
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="text-xs font-semibold text-navy hover:text-sand uppercase tracking-widest flex items-center gap-2 transition-colors ml-auto md:ml-0 w-full md:w-auto justify-end md:justify-start pt-2 md:pt-0 border-t md:border-t-0 border-gray-200"
            >
              {isAdvancedOpen ? <Minus size={14} /> : <Plus size={14} />}
              Fler filter
            </button>
          </div>

          {/* Expanded Advanced Filters */}
          <div
            className={`bg-white border-t border-gray-100 overflow-hidden transition-all duration-500 ease-in-out ${isAdvancedOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-sage mb-4">
                  Rum & Yta
                </h4>
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4, '5+'].map((n) => (
                    <button
                      key={n}
                      className="w-8 h-8 rounded-full border border-gray-200 text-xs font-medium text-gray-500 hover:border-navy hover:text-navy hover:bg-navy/5 transition-all"
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-gray-400">Antal sovrum</div>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-sage mb-4">
                  Faciliteter
                </h4>
                <div className="space-y-2">
                  {[
                    'Garage / Parkering',
                    'Hiss',
                    'AC',
                    'Golfnära',
                    'Gångavstånd strand',
                  ].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-navy"
                    >
                      <div className="w-4 h-4 border border-gray-300 rounded-sm" />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-sage mb-4">
                  Område specificitet
                </h4>
                <div className="space-y-2">
                  {[
                    'Frontline Beach',
                    'Gated Community',
                    'Bergsby',
                    'Stadspuls',
                  ].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-navy"
                    >
                      <div className="w-4 h-4 border border-gray-300 rounded-sm" />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <button className="w-full py-3 border border-navy text-navy text-xs uppercase tracking-widest font-semibold hover:bg-navy hover:text-white transition-colors">
                  Uppdatera resultat (142)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-8 text-white/70 text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-medium animate-fade-in text-center pb-8 md:pb-0">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 border border-sand rounded-full" />
            <span>2,450+ objekt till salu</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 border border-sand rounded-full" />
            <span>Licensierade i RAICV</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 border border-sand rounded-full" />
            <span>Premium Partners</span>
          </div>
        </div>
      </div>
    </div>
  );
}