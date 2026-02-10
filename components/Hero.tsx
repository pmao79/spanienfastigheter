'use client';

import HeroSearch from '@/components/search/HeroSearch';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative min-h-screen md:h-[95vh] w-full flex flex-col justify-start md:justify-center items-center bg-navy overflow-hidden pt-32 md:pt-0">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bakgrundsspanfast.webp"
          alt="Tre generationer av en familj blickar ut över havet i solnedgången"
          fill
          sizes="100vw"
          className="object-cover object-[center_70%] opacity-90 scale-105 animate-slow-zoom"
          priority
          quality={60}
        />
        <div className="absolute inset-0 bg-navy/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-navy/40" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center">
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-[1.05] text-center drop-shadow-lg tracking-tight">
          Köp bostad i Spanien <br />
          <span className="italic font-light text-alabaster/90">
            Costa Blanca &amp; Costa del Sol
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-light leading-relaxed text-center antialiased opacity-90">
          Utforska 2,450+ fastigheter till salu i Spaniens mest eftertraktade områden.
          Villor, lägenheter och radhus – med svensk support genom hela köpet.
        </p>

        {/* New Search Interface */}
        <HeroSearch variant="hero" />

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
