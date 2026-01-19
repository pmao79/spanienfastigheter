import React from 'react';
import { ShieldCheck, MessageCircleHeart, FileCheck, Key } from 'lucide-react';

export const TrustSignals: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck size={28} strokeWidth={1.2} />,
      title: "Juridisk Garanti",
      subtitle: "Inga risker.",
      description: "Varje fastighet genomgår en strikt 'Due Diligence' av våra oberoende advokater innan den presenteras för dig. Vi garanterar att lagfarter och licenser är i sin ordning."
    },
    {
      icon: <MessageCircleHeart size={28} strokeWidth={1.2} />,
      title: "Hemma fast borta",
      subtitle: "Vi talar ditt språk.",
      description: "Vårt team består av svenskar bosatta på plats. Vi förstår både den svenska mentaliteten och den spanska byråkratin – och överbryggar gapet däremellan."
    },
    {
      icon: <FileCheck size={28} strokeWidth={1.2} />,
      title: "Total Transparens",
      subtitle: "Inga dolda kostnader.",
      description: "Du får en fullständig kostnadskalkyl inkl. skatter, notarieavgifter och juridiska kostnader innan du lägger ett bud. Inga överraskningar."
    },
    {
      icon: <Key size={28} strokeWidth={1.2} />,
      title: "VIP-Tillgång",
      subtitle: "Före marknaden.",
      description: "Genom våra exklusiva samarbeten med ledande byggherrar får våra kunder ofta förtur till de bästa lägena i nyproduktionsprojekt."
    }
  ];

  return (
    <section className="bg-alabaster py-24 border-b border-gray-100 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-greige/20 -skew-x-12 translate-x-32 z-0"></div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Editorial Header */}
        <div className="mb-20 max-w-2xl">
          <span className="text-sage text-[10px] uppercase tracking-[0.25em] font-bold mb-4 block animate-fade-in">
            Varför Spanienfastigheter.se?
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-navy mb-6 leading-[1.15]">
            Vi gör det komplexa <br />
            <span className="italic text-sand">enkelt & tryggt.</span>
          </h2>
          <p className="text-gray-500 font-light text-lg leading-relaxed">
            Att köpa bostad utomlands är en stor affär. Därför har vi byggt en tjänst som eliminerar osäkerhet och låter dig fokusera på det roliga – att hitta ditt drömhem.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white p-8 border border-gray-100 shadow-soft hover:shadow-hover hover:-translate-y-2 transition-all duration-500 ease-out rounded-sm relative"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-navy to-navy/80 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              
              {/* Icon */}
              <div className="w-14 h-14 bg-greige/50 rounded-full flex items-center justify-center text-navy mb-6 group-hover:bg-navy group-hover:text-white transition-colors duration-500">
                {feature.icon}
              </div>

              {/* Text Content */}
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-sage font-bold block opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  {feature.subtitle}
                </span>
                <h3 className="text-xl font-serif text-navy">
                  {feature.title}
                </h3>
                <p className="text-sm text-charcoal/70 font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Bottom Decorative Arrow */}
              <div className="mt-8 flex justify-end opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                 <div className="w-8 h-px bg-sand"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};