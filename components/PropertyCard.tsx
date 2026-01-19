import React from 'react';
import { Bed, Bath, Expand, MapPin, Heart, Bitcoin } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onClick?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  return (
    <div 
      className="group bg-white rounded-sm overflow-hidden hover:shadow-hover transition-all duration-500 border border-gray-100 flex flex-col h-full cursor-pointer"
      onClick={() => onClick && onClick(property)}
    >
      {/* Image Section */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        {/* Badges - Design System */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
          {property.tags.map((tag) => {
            let badgeStyle = "bg-white/95 text-charcoal";
            if (tag === 'Exklusiv') badgeStyle = "bg-navy text-white border border-navy";
            if (tag === 'Nyproduktion') badgeStyle = "bg-alabaster text-navy border border-gray-200";
            if (tag === 'Turistlicens') badgeStyle = "bg-sage text-white";
            
            return (
              <span 
                key={tag}
                className={`px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest shadow-sm ${badgeStyle}`}
              >
                {tag}
              </span>
            );
          })}
        </div>

        {/* Favorite Button */}
        <button 
          className="absolute top-4 right-4 p-2.5 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-all duration-300 rounded-full border border-white/20"
          onClick={(e) => { e.stopPropagation(); }}
        >
          <Heart size={16} strokeWidth={1.5} />
        </button>

        {/* Distance Overlay (Subtle) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy/80 via-navy/40 to-transparent pt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-xs font-medium flex items-center gap-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
            <MapPin size={14} className="text-sand" />
            {property.distanceToBeach}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <div className="flex justify-between items-start mb-1">
            <p className="text-[10px] text-sage uppercase tracking-[0.15em] font-bold">{property.region}</p>
          </div>
          <h3 className="text-xl font-serif text-navy font-medium leading-snug group-hover:text-sand transition-colors duration-300">
            {property.title}
          </h3>
          <p className="text-sm text-gray-500 font-light mt-1">{property.location}</p>
        </div>

        {/* Price Section */}
        <div className="flex flex-col gap-1 mb-6 pb-6 border-b border-greige">
          <span className="text-2xl font-serif text-navy">
            {property.price.toLocaleString('sv-SE')} €
          </span>
          {property.btcPrice && (
            <div className="flex items-center gap-1.5 text-xs text-sage font-mono bg-greige/50 w-fit px-2 py-1 rounded-sm">
              <Bitcoin size={12} className="text-sand" />
              <span>{property.btcPrice.toFixed(4)} BTC</span>
            </div>
          )}
        </div>

        {/* Specs */}
        <div className="flex items-center justify-between text-charcoal mt-auto">
          <div className="flex flex-col items-center gap-1 group/icon">
            <Bed size={18} strokeWidth={1} className="text-gray-400 group-hover/icon:text-navy transition-colors" />
            <span className="text-xs font-medium">{property.bedrooms} <span className="text-gray-400 font-light">sov</span></span>
          </div>
          <div className="w-px h-8 bg-greige"></div>
          <div className="flex flex-col items-center gap-1 group/icon">
            <Bath size={18} strokeWidth={1} className="text-gray-400 group-hover/icon:text-navy transition-colors" />
            <span className="text-xs font-medium">{property.bathrooms} <span className="text-gray-400 font-light">bad</span></span>
          </div>
          <div className="w-px h-8 bg-greige"></div>
          <div className="flex flex-col items-center gap-1 group/icon">
            <Expand size={18} strokeWidth={1} className="text-gray-400 group-hover/icon:text-navy transition-colors" />
            <span className="text-xs font-medium">{property.area} <span className="text-gray-400 font-light">m²</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};