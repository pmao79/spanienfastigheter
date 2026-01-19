import React from 'react';
import { Instagram, Facebook, Linkedin, Mail, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
        
        {/* Brand - Col 4 */}
        <div className="md:col-span-4 pr-12">
          <div className="text-2xl font-serif font-medium tracking-tight mb-8">
            Spanienfastigheter<span className="text-sand">.se</span>
          </div>
          <p className="text-white/60 font-light text-sm mb-8 leading-relaxed max-w-sm">
            Din trygga partner för bostadsaffärer på Costa Blanca och Costa del Sol. Vi kombinerar skandinavisk standard med spansk livskvalitet.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-sand transition-colors"><Instagram size={20} strokeWidth={1.5} /></a>
            <a href="#" className="text-white/40 hover:text-sand transition-colors"><Facebook size={20} strokeWidth={1.5} /></a>
            <a href="#" className="text-white/40 hover:text-sand transition-colors"><Linkedin size={20} strokeWidth={1.5} /></a>
          </div>
        </div>

        {/* Links - Col 2 */}
        <div className="md:col-span-2">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8 text-sand">Destinationer</h4>
          <ul className="space-y-4 text-sm text-white/60 font-light">
            <li><a href="#" className="hover:text-white transition-colors block">Costa del Sol</a></li>
            <li><a href="#" className="hover:text-white transition-colors block">Costa Blanca</a></li>
          </ul>
        </div>

        {/* Links - Col 2 */}
        <div className="md:col-span-2">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8 text-sand">Företaget</h4>
          <ul className="space-y-4 text-sm text-white/60 font-light">
            <li><a href="#" className="hover:text-white transition-colors block">Om oss</a></li>
            <li><a href="#" className="hover:text-white transition-colors block">Sälja bostad</a></li>
            <li><a href="#" className="hover:text-white transition-colors block">Köpguide</a></li>
            <li><a href="#" className="hover:text-white transition-colors block">Karriär</a></li>
            <li><a href="#" className="hover:text-white transition-colors block">Kontakt</a></li>
          </ul>
        </div>

        {/* Newsletter - Col 4 */}
        <div className="md:col-span-4">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8 text-sand">Nyhetsbrev</h4>
          <p className="text-white/60 font-light text-sm mb-6">
            Få tillgång till "Off-market" objekt och marknadsanalyser innan de når publika marknaden.
          </p>
          <div className="flex border-b border-white/20 pb-2 relative group">
            <input 
              type="email" 
              placeholder="Din e-postadress" 
              className="bg-transparent outline-none text-white placeholder-white/20 w-full text-sm py-2 font-light"
            />
            <button className="text-white/40 group-hover:text-sand transition-colors absolute right-0 top-2">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/30 uppercase tracking-widest">
        <p>&copy; {new Date().getFullYear()} Spanienfastigheter AB.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Integritet</a>
          <a href="#" className="hover:text-white transition-colors">Cookies</a>
          <a href="#" className="hover:text-white transition-colors">Villkor</a>
        </div>
      </div>
    </footer>
  );
};