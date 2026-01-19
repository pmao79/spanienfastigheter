import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterSidebar } from './components/FilterSidebar';
import { PropertyCard } from './components/PropertyCard';
import { AreaCard } from './components/AreaCard';
import { TrustSignals } from './components/TrustSignals';
import { Footer } from './components/Footer';
import { PropertyDetails } from './components/PropertyDetails';
import { SearchServiceModal } from './components/SearchServiceModal';
import { PROPERTIES, AREAS } from './constants';
import { Property } from './types';
import { Phone, ArrowRight, Check, Star } from 'lucide-react';

const App: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isSearchServiceOpen, setIsSearchServiceOpen] = useState(false);

  // Function to open the concierge modal
  const openSearchService = () => setIsSearchServiceOpen(true);

  // If a property is selected, show the details page
  if (selectedProperty) {
    return (
      <div className="min-h-screen bg-alabaster font-sans text-charcoal selection:bg-navy selection:text-white">
        <PropertyDetails 
          property={selectedProperty} 
          onBack={() => setSelectedProperty(null)} 
          onOpenSearchService={openSearchService}
        />
        <Footer />
        <SearchServiceModal isOpen={isSearchServiceOpen} onClose={() => setIsSearchServiceOpen(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-alabaster font-sans text-charcoal selection:bg-navy selection:text-white">
      <Header />
      
      <main>
        <Hero />
        
        <TrustSignals />

        {/* Areas Section - Redesigned with Navy Feature Block */}
        <section className="py-24 bg-slate-50 relative">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            
            {/* Dark Navy Header Block to break up the design */}
            <div className="bg-navy p-10 md:p-16 mb-12 rounded-sm shadow-xl flex flex-col md:flex-row justify-between items-end gap-8 relative overflow-hidden group">
               {/* Decorative subtle light leak */}
               <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-700 group-hover:opacity-70"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-sand/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

               <div className="max-w-xl relative z-10">
                 <span className="text-sand text-[10px] uppercase tracking-[0.25em] font-bold mb-4 block">Destinationer</span>
                 <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">Upptäck livet <br/>längs kusten</h2>
                 <p className="text-white/70 font-light leading-relaxed text-lg">
                   Från pulserande stadsliv i Palma till lugna bergsbyar på fastlandet. Vi hjälper dig navigera bland Spaniens mest eftertraktade adresser.
                 </p>
               </div>
               
               <button className="group flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-semibold text-white hover:text-sand transition-colors relative z-10 whitespace-nowrap pb-1 border-b border-transparent hover:border-sand">
                 Visa alla områden
                 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-sand" />
               </button>
            </div>
            
            {/* The Grid Cards now sit below the dark block */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {AREAS.map(area => (
                <AreaCard key={area.id} area={area} />
              ))}
            </div>
          </div>
        </section>

        {/* Properties Section */}
        <section className="py-32 bg-greige/30 border-y border-gray-100 relative">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="flex flex-col lg:flex-row gap-16">
              
              {/* Sidebar (Sticky) */}
              <aside className="hidden lg:block w-80 flex-shrink-0 h-fit sticky top-32">
                <FilterSidebar onOpenSearchService={openSearchService} />
                
                {/* Simplified Helper Card call was moved inside FilterSidebar for cleaner code, but we can keep additional promos here if needed */}
              </aside>

              {/* Main Content */}
              <div className="flex-1">
                <div className="flex justify-between items-end mb-12">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-serif text-navy mb-3">Utvalda fastigheter</h2>
                    <p className="text-gray-500 font-light text-sm">Visar 4 av 2,450 objekt</p>
                  </div>
                  <div className="hidden md:flex gap-8 border-b border-gray-200 pb-2">
                    <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy border-b-2 border-navy pb-2 -mb-2.5">Senast inkommet</button>
                    <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-navy transition-colors">Exklusivt</button>
                    <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-navy transition-colors">Prissänkt</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                  {PROPERTIES.map(property => (
                    <PropertyCard 
                      key={property.id} 
                      property={property} 
                      onClick={(prop) => {
                        window.scrollTo(0,0);
                        setSelectedProperty(prop);
                      }}
                    />
                  ))}
                </div>

                <div className="mt-20 text-center">
                  <button className="bg-transparent border border-navy text-navy px-12 py-5 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-navy hover:text-white transition-all duration-300">
                    Visa alla 2,450 bostäder
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Brand Promise / Contact Form */}
        <section className="py-24 bg-navy relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
          
          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              
              {/* Left Side: Value Prop (White text on Navy) */}
              <div className="text-white">
                <span className="text-sand text-[10px] uppercase tracking-[0.25em] font-bold mb-4 block">Vår filosofi</span>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
                  Trygghet genom <br/>
                  <span className="italic text-sand/90">hela affären.</span>
                </h2>
                
                <p className="text-white/70 font-light text-lg mb-10 max-w-md leading-relaxed">
                   Vi vet att ett bostadsköp i Spanien är en stor livshändelse. Därför har vi skapat en process som är lika säker som den är inspirerande.
                </p>

                <div className="space-y-8">
                    {[
                        {title: 'Juridisk Garanti', text: 'Vi kontrollerar alla licenser och lagfarter innan vi publicerar.'},
                        {title: 'Svenska Kontrakt', text: 'All dokumentation översätts och gås igenom på svenska.'},
                        {title: 'Livslång Service', text: 'Vi hjälper till med el, vatten och renovering även efter tillträdet.'}
                    ].map((item, i) => (
                        <div key={i} className="flex gap-5 group cursor-default">
                            <div className="mt-1 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0 text-sand group-hover:bg-sand group-hover:text-navy transition-all duration-300">
                                <Check size={18} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h4 className="font-serif text-lg text-white mb-1 group-hover:text-sand transition-colors">{item.title}</h4>
                                <p className="text-white/50 font-light text-sm group-hover:text-white/70 transition-colors">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
              </div>

              {/* Right Side: The Premium Form Card */}
              <div className="relative">
                {/* Gold Accent Line */}
                <div className="absolute top-0 left-8 right-8 h-1 bg-sand z-20"></div>
                
                <div className="bg-white p-8 md:p-12 shadow-2xl rounded-sm relative z-10">
                  <div className="mb-8">
                     <h3 className="text-3xl font-serif text-navy mb-2">Boka rådgivning</h3>
                     <p className="text-gray-400 font-light text-sm">Fyll i formuläret så kontaktar en av våra mäklare dig inom 24h.</p>
                  </div>

                  <form className="space-y-5">
                      <div className="grid grid-cols-2 gap-5">
                          <div className="space-y-1.5 group">
                              <label className="text-[10px] uppercase tracking-widest text-sage font-bold group-focus-within:text-navy transition-colors">Förnamn</label>
                              <input 
                                type="text" 
                                className="w-full bg-greige/30 border border-transparent focus:bg-white focus:border-navy focus:ring-4 focus:ring-gray-100 transition-all duration-300 rounded-sm px-4 py-3.5 text-sm outline-none placeholder-gray-400 text-charcoal" 
                                placeholder="Anna" 
                              />
                          </div>
                          <div className="space-y-1.5 group">
                              <label className="text-[10px] uppercase tracking-widest text-sage font-bold group-focus-within:text-navy transition-colors">Efternamn</label>
                              <input 
                                type="text" 
                                className="w-full bg-greige/30 border border-transparent focus:bg-white focus:border-navy focus:ring-4 focus:ring-gray-100 transition-all duration-300 rounded-sm px-4 py-3.5 text-sm outline-none placeholder-gray-400 text-charcoal" 
                                placeholder="Andersson" 
                              />
                          </div>
                      </div>
                      
                      <div className="space-y-1.5 group">
                          <label className="text-[10px] uppercase tracking-widest text-sage font-bold group-focus-within:text-navy transition-colors">Email</label>
                          <input 
                            type="email" 
                            className="w-full bg-greige/30 border border-transparent focus:bg-white focus:border-navy focus:ring-4 focus:ring-gray-100 transition-all duration-300 rounded-sm px-4 py-3.5 text-sm outline-none placeholder-gray-400 text-charcoal" 
                            placeholder="anna@exempel.se" 
                          />
                      </div>
                      
                      <div className="space-y-1.5 group">
                          <label className="text-[10px] uppercase tracking-widest text-sage font-bold group-focus-within:text-navy transition-colors">Telefon</label>
                          <input 
                            type="tel" 
                            className="w-full bg-greige/30 border border-transparent focus:bg-white focus:border-navy focus:ring-4 focus:ring-gray-100 transition-all duration-300 rounded-sm px-4 py-3.5 text-sm outline-none placeholder-gray-400 text-charcoal" 
                            placeholder="+46..." 
                          />
                      </div>

                      <div className="pt-4">
                          <button className="w-full bg-navy text-white py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-charcoal transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-navy/20 hover:shadow-xl hover:-translate-y-0.5">
                              <Phone size={16} className="text-sand" />
                              Bli kontaktad
                          </button>
                          <p className="text-center text-[10px] text-gray-400 mt-4">Genom att skicka godkänner du vår integritetspolicy.</p>
                      </div>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
      <SearchServiceModal isOpen={isSearchServiceOpen} onClose={() => setIsSearchServiceOpen(false)} />
    </div>
  );
};

export default App;