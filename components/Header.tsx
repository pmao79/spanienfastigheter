import React, { useState, useEffect } from 'react';
import { Search, Globe, Menu, X, Heart } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-gray-100 py-3 shadow-sm' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 z-50">
          <div className={`text-2xl md:text-3xl font-serif font-medium tracking-tight ${isScrolled ? 'text-navy' : 'text-white'}`}>
            Spanienfastigheter<span className="text-sand">.se</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className={`hidden lg:flex items-center gap-10 ${isScrolled ? 'text-charcoal' : 'text-white/90'}`}>
          {['Till Salu', 'Nyproduktion', 'Områden', 'Sälja', 'Kontakt'].map((item) => (
            <a 
              key={item}
              href="#" 
              className="text-[11px] uppercase tracking-[0.2em] font-semibold hover:text-sand transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-sand transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Utilities */}
        <div className={`hidden lg:flex items-center gap-6 ${isScrolled ? 'text-navy' : 'text-white'}`}>
          <button className="flex items-center gap-2 text-xs font-medium hover:opacity-70 transition-opacity">
            <Globe size={16} />
            <span className="tracking-widest">SV</span>
          </button>
          
          <div className="h-4 w-px bg-current opacity-20"></div>
          
          <button className="hover:text-sand transition-colors">
            <Heart size={18} />
          </button>
          
          <button className="hover:text-sand transition-colors">
            <Search size={18} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`lg:hidden z-50 p-2 ${isMobileMenuOpen ? 'text-navy' : (isScrolled ? 'text-navy' : 'text-white')}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-alabaster z-40 flex flex-col pt-32 px-6 lg:hidden animate-fade-in">
          <nav className="flex flex-col gap-6 text-navy text-center">
            {['Till Salu', 'Nyproduktion', 'Områden', 'Sälja', 'Guider'].map((item) => (
              <a key={item} href="#" className="text-3xl font-serif hover:text-sand transition-colors">{item}</a>
            ))}
            <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col gap-4">
               <a href="#" className="text-sm font-sans uppercase tracking-widest text-charcoal/60">Logga in</a>
               <a href="#" className="text-sm font-sans uppercase tracking-widest text-charcoal/60">Svenska</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};