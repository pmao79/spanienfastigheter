import React from 'react';
import { Area } from '../types';
import { ArrowRight } from 'lucide-react';

interface AreaCardProps {
  area: Area;
}

export const AreaCard: React.FC<AreaCardProps> = ({ area }) => {
  return (
    <div className="group relative h-[400px] overflow-hidden cursor-pointer">
      <img 
        src={area.image} 
        alt={area.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/30 transition-colors"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent opacity-80"></div>
      
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <span className="text-sand text-xs uppercase tracking-widest font-medium mb-2 block">
          {area.propertyCount} objekt till salu
        </span>
        <h3 className="text-3xl font-serif text-white mb-2">{area.name}</h3>
        <p className="text-white/80 line-clamp-2 mb-6 font-light max-w-xs">
          {area.description}
        </p>
        <div className="flex items-center gap-2 text-white text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
          <span>Utforska området</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
};