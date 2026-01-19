import React, { useState } from 'react';
import { Property } from '../types';
import { 
  MapPin, Bed, Bath, Expand, Heart, Share2, 
  ArrowLeft, Check, Sun, Calendar, Euro, 
  Home, Plane, Trees, Phone, Mail, FileText, Waves,
  Bitcoin, Car, Wifi, Zap, Wind, Dumbbell, Tv,
  ChevronLeft, ChevronRight, Search, ArrowRight
} from 'lucide-react';

interface PropertyDetailsProps {
  property: Property;
  onBack: () => void;
  onOpenSearchService: () => void;
}

// Helper to select icon based on feature text
const getFeatureIcon = (text: string) => {
  const t = text.toLowerCase();
  if (t.includes('pool') || t.includes('jacuzzi')) return <Waves size={20} />;
  if (t.includes('garage') || t.includes('parkering')) return <Car size={20} />;
  if (t.includes('wifi') || t.includes('internet')) return <Wifi size={20} />;
  if (t.includes('ac') || t.includes('klimat')) return <Wind size={20} />;
  if (t.includes('el') || t.includes('smart')) return <Zap size={20} />;
  if (t.includes('gym') || t.includes('fitness')) return <Dumbbell size={20} />;
  if (t.includes('tv') || t.includes('satellit')) return <Tv size={20} />;
  if (t.includes('sol') || t.includes('terrass')) return <Sun size={20} />;
  return <Check size={20} />;
};

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property, onBack, onOpenSearchService }) => {
  const [activeImage, setActiveImage] = useState(0);

  // Fallback images if property.images is empty or minimal
  const galleryImages = property.images && property.images.length > 0 
    ? property.images 
    : [property.image, property.image, property.image, property.image, property.image];

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImage((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="bg-alabaster min-h-screen pb-32 animate-fade-in">
      
      {/* 1. Header Navigation */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 h-16 md:h-20 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm uppercase tracking-widest font-semibold hover:text-navy transition-colors text-gray-500"
          >
            <ArrowLeft size={16} />
            <span className="hidden md:inline">Tillbaka till sök</span>
            <span className="md:hidden">Tillbaka</span>
          </button>
          
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-sm font-medium hover:text-navy transition-colors">
              <Share2 size={18} />
              <span className="hidden md:inline">Dela</span>
            </button>
            <button className="flex items-center gap-2 text-sm font-medium hover:text-red-500 transition-colors">
              <Heart size={18} />
              <span className="hidden md:inline">Spara</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Editorial Gallery (Bento Grid) */}
      <div className="max-w-[1400px] mx-auto px-0 md:px-12 mt-0 md:mt-8">
        
        {/* Mobile Gallery Slider */}
        <div className="md:hidden aspect-[4/3] relative group bg-gray-100">
          <img 
            src={galleryImages[activeImage]} 
            className="w-full h-full object-cover transition-all duration-300" 
            alt={`${property.title} - Bild ${activeImage + 1}`} 
          />
          
          {/* Navigation Arrows */}
          <button 
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2.5 rounded-full text-navy hover:bg-white shadow-sm active:scale-95 transition-all z-10"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2.5 rounded-full text-navy hover:bg-white shadow-sm active:scale-95 transition-all z-10"
          >
            <ChevronRight size={20} />
          </button>

          {/* Counter Badge */}
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium tracking-widest px-3 py-1.5 rounded-full border border-white/10">
            {activeImage + 1} / {galleryImages.length}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[600px] rounded-lg overflow-hidden">
          <div className="col-span-2 row-span-2 relative group cursor-pointer">
             <img src={galleryImages[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Main" />
             <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
          </div>
          <div className="col-span-1 row-span-1 relative group cursor-pointer">
             <img src={galleryImages[1] || galleryImages[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Detail 1" />
          </div>
          <div className="col-span-1 row-span-1 relative group cursor-pointer">
             <img src={galleryImages[2] || galleryImages[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Detail 2" />
          </div>
          <div className="col-span-1 row-span-1 relative group cursor-pointer">
             <img src={galleryImages[3] || galleryImages[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Detail 3" />
          </div>
          <div className="col-span-1 row-span-1 relative group cursor-pointer">
             <img src={galleryImages[4] || galleryImages[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Detail 4" />
             <div className="absolute inset-0 bg-navy/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-serif italic text-lg">Visa alla bilder</span>
             </div>
          </div>
        </div>
      </div>

      {/* 3. Main Content Container */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-8 md:mt-12">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* LEFT COLUMN (Content) */}
          <div className="flex-1">
            
            {/* Title & Price Header */}
            <div className="border-b border-gray-200 pb-8 mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {property.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-navy/5 text-navy text-[10px] uppercase tracking-widest font-bold rounded-sm">
                    {tag}
                  </span>
                ))}
                <span className="px-3 py-1 bg-sand/20 text-charcoal text-[10px] uppercase tracking-widest font-bold rounded-sm flex items-center gap-1">
                  <MapPin size={10} /> {property.region}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-serif text-navy mb-4 leading-tight">{property.title}</h1>
              <p className="text-lg text-gray-500 font-light flex items-center gap-2 mb-6">
                <MapPin size={18} className="text-sand" />
                {property.location}
              </p>

              <div>
                <div className="flex items-end gap-4">
                  <span className="text-3xl md:text-4xl font-serif text-navy">
                    {property.price.toLocaleString('sv-SE')} €
                  </span>
                  <span className="text-sm text-gray-400 mb-2">ca {Math.round(property.price * 11.2).toLocaleString('sv-SE')} SEK</span>
                </div>
                
                {/* Bitcoin Price Display */}
                {property.btcPrice && (
                  <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-sm">
                    <div className="bg-[#F7931A] text-white p-0.5 rounded-full">
                      <Bitcoin size={12} strokeWidth={2.5} />
                    </div>
                    <span className="font-mono text-sm text-charcoal font-medium tracking-tight">
                      {property.btcPrice.toFixed(4)} BTC
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Key Specs Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="p-4 bg-white border border-gray-100 rounded-sm hover:shadow-soft transition-shadow">
                <div className="flex items-center gap-3 mb-1">
                  <Bed size={20} className="text-sand" />
                  <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Sovrum</span>
                </div>
                <span className="text-xl font-serif text-navy">{property.bedrooms} st</span>
              </div>
              <div className="p-4 bg-white border border-gray-100 rounded-sm hover:shadow-soft transition-shadow">
                <div className="flex items-center gap-3 mb-1">
                  <Bath size={20} className="text-sand" />
                  <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Badrum</span>
                </div>
                <span className="text-xl font-serif text-navy">{property.bathrooms} st</span>
              </div>
              <div className="p-4 bg-white border border-gray-100 rounded-sm hover:shadow-soft transition-shadow">
                <div className="flex items-center gap-3 mb-1">
                  <Expand size={20} className="text-sand" />
                  <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Boyta</span>
                </div>
                <span className="text-xl font-serif text-navy">{property.area} m²</span>
              </div>
              {property.terraceArea && (
                <div className="p-4 bg-white border border-gray-100 rounded-sm hover:shadow-soft transition-shadow">
                  <div className="flex items-center gap-3 mb-1">
                    <Sun size={20} className="text-sand" />
                    <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Terrass</span>
                  </div>
                  <span className="text-xl font-serif text-navy">{property.terraceArea} m²</span>
                </div>
              )}
            </div>

            {/* Description & Story */}
            <div className="mb-12">
              <h3 className="text-xl font-serif text-navy mb-6">Om bostaden</h3>
              <div className="prose prose-lg text-gray-600 font-light leading-relaxed whitespace-pre-line border-l-2 border-sand pl-6">
                {property.longDescription || property.description}
              </div>
            </div>

            {/* Features List */}
            <div className="mb-12">
              <h3 className="text-xl font-serif text-navy mb-6">Egenskaper & Faciliteter</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.features?.map((feature, idx) => (
                  <div key={idx} className="group flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-sm hover:border-sand hover:shadow-soft transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-alabaster group-hover:bg-sand/10 flex items-center justify-center text-gray-400 group-hover:text-sand transition-colors">
                      {getFeatureIcon(feature)}
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
                {/* Fallback features if none provided */}
                {!property.features && (
                  <div className="col-span-2 text-gray-400 italic">Inga specifika egenskaper listade.</div>
                )}
              </div>
            </div>

            {/* Financial Details - DARK MODE SECTION */}
            <div className="mb-12 bg-navy p-8 md:p-10 rounded-sm shadow-xl relative overflow-hidden text-white">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-sand/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              <h3 className="text-xl font-serif text-white mb-8 flex items-center gap-3 relative z-10">
                <div className="p-2 bg-white/10 rounded-full">
                   <Euro size={18} className="text-sand" />
                </div>
                Ekonomi & Drift
              </h3>
              
              <div className="relative z-10">
                <table className="w-full text-left text-sm">
                  <thead className="text-sand/80 uppercase tracking-widest text-[10px]">
                    <tr>
                      <th className="pb-4 font-bold border-b border-white/10">Post</th>
                      <th className="pb-4 font-bold border-b border-white/10">Kostnad</th>
                      <th className="pb-4 font-bold hidden md:table-cell border-b border-white/10">Frekvens</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr>
                      <td className="py-4 text-gray-300 font-medium">Samfällighetsavgift</td>
                      <td className="py-4 font-serif text-lg text-white">{property.communityFee ? `€ ${property.communityFee}` : 'Ej angivet'}</td>
                      <td className="py-4 text-white/40 hidden md:table-cell">/ månad</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-300 font-medium">Fastighetsskatt (IBI)</td>
                      <td className="py-4 font-serif text-lg text-white">{property.ibiTax ? `€ ${property.ibiTax}` : 'Ej angivet'}</td>
                      <td className="py-4 text-white/40 hidden md:table-cell">/ år</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-300 font-medium">Sophämtning (Basura)</td>
                      <td className="py-4 font-serif text-lg text-white">{property.garbageTax ? `€ ${property.garbageTax}` : '€ 120'}</td>
                      <td className="py-4 text-white/40 hidden md:table-cell">/ år</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Location / Distances */}
            <div className="mb-12">
              <h3 className="text-xl font-serif text-navy mb-6">Avstånd & Område</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 text-center gap-3 hover:border-sand hover:shadow-soft transition-all duration-300 group">
                   <Waves size={24} className="text-gray-300 group-hover:text-sage transition-colors" strokeWidth={1.5} />
                   <span className="text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-navy">Strand</span>
                   <span className="font-serif text-navy text-lg">{property.distanceToBeach}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 text-center gap-3 hover:border-sand hover:shadow-soft transition-all duration-300 group">
                   <Plane size={24} className="text-gray-300 group-hover:text-sage transition-colors" strokeWidth={1.5} />
                   <span className="text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-navy">Flygplats</span>
                   <span className="font-serif text-navy text-lg">{property.distanceToAirport || '45 min'}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 text-center gap-3 hover:border-sand hover:shadow-soft transition-all duration-300 group">
                   <Trees size={24} className="text-gray-300 group-hover:text-sage transition-colors" strokeWidth={1.5} />
                   <span className="text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-navy">Golf</span>
                   <span className="font-serif text-navy text-lg">{property.distanceToGolf || '10 min'}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 text-center gap-3 hover:border-sand hover:shadow-soft transition-all duration-300 group">
                   <Home size={24} className="text-gray-300 group-hover:text-sage transition-colors" strokeWidth={1.5} />
                   <span className="text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-navy">Centrum</span>
                   <span className="font-serif text-navy text-lg">5 min</span>
                </div>
              </div>
            </div>

            {/* NEW: Concierge / Search Service CTA */}
            <div className="mb-12 relative rounded-sm overflow-hidden group cursor-pointer" onClick={onOpenSearchService}>
              <img src="https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=2070&auto=format&fit=crop" className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105" alt="Search service" />
              <div className="absolute inset-0 bg-navy/60 group-hover:bg-navy/50 transition-colors"></div>
              
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
                <span className="text-sand text-[10px] uppercase tracking-[0.25em] font-bold mb-4 animate-fade-in">Personlig Söktjänst</span>
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-6">Låt oss hitta din dröm.</h3>
                <p className="text-white/80 max-w-lg mb-8 font-light leading-relaxed hidden md:block">
                  Som medlem i vårt spekulantregister får du tillgång till bostäder innan de når den öppna marknaden. Berätta vad du söker, så gör vi jobbet.
                </p>
                <button className="bg-white text-navy px-8 py-4 uppercase tracking-[0.15em] text-xs font-bold hover:bg-sand hover:text-white transition-all duration-300 flex items-center gap-3 shadow-lg">
                  Ange dina önskemål <ArrowRight size={16} />
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (Sticky Sidebar) */}
          <div className="lg:w-96 flex-shrink-0">
             <div className="sticky top-32 space-y-6">
                
                {/* Agent Card */}
                <div className="bg-white p-6 border border-gray-100 shadow-soft relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-navy to-sage"></div>
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" 
                      className="w-16 h-16 rounded-full object-cover border-2 border-alabaster shadow-sm" 
                      alt="Agent" 
                    />
                    <div>
                      <h4 className="font-serif text-lg text-navy">Erik Lindberg</h4>
                      <p className="text-xs text-sage uppercase tracking-widest font-semibold">Senior Mäklare</p>
                    </div>
                  </div>
                  
                  <div className="bg-greige/30 p-4 rounded-sm mb-6 text-sm text-gray-600 italic leading-relaxed relative">
                     <span className="text-4xl text-sand absolute -top-2 left-2 opacity-40 font-serif">"</span>
                     Detta är ett unikt objekt med sällsynt hög standard. Jag rekommenderar en visning i solnedgången för att verkligen förstå magin med terrassen.
                  </div>

                  <div className="space-y-3">
                    <button className="w-full bg-navy text-white py-4 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-charcoal transition-colors flex items-center justify-center gap-2 shadow-lg shadow-navy/20">
                       <Calendar size={16} /> Boka Visning
                    </button>
                    <button className="w-full bg-white border border-navy text-navy py-4 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-greige transition-colors flex items-center justify-center gap-2">
                       <Mail size={16} /> Kontakta mig
                    </button>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                    <a href="#" className="text-xs text-gray-400 hover:text-navy underline decoration-sand decoration-1 underline-offset-4">
                      +46 70 123 45 67
                    </a>
                  </div>
                </div>

                {/* PDF Download */}
                <div className="bg-charcoal text-white p-6 flex justify-between items-center cursor-pointer hover:bg-navy transition-colors group">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest opacity-60 block mb-1">Dokument</span>
                    <span className="font-serif text-lg group-hover:text-sand transition-colors">Ladda ner prospekt</span>
                  </div>
                  <FileText size={24} className="text-sand/50 group-hover:text-sand transition-colors transform group-hover:-translate-y-1 duration-300" />
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50 flex gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button className="flex-1 bg-white border border-navy text-navy py-3 uppercase tracking-widest text-xs font-bold rounded-sm flex items-center justify-center gap-2">
           <Phone size={16} /> Ring
        </button>
        <button className="flex-[2] bg-navy text-white py-3 uppercase tracking-widest text-xs font-bold rounded-sm flex items-center justify-center gap-2">
           Boka Visning
        </button>
      </div>

    </div>
  );
};