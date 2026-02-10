'use client';

import { Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { sendBookingConfirmation } from '@/actions/email/send-booking';

export default function TrustSignals() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    };

    try {
      const result = await sendBookingConfirmation(data);
      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert('Något gick fel. Försök igen.');
      }
    } catch (error) {
      console.error(error);
      alert('Något gick fel.');
    } finally {
      setIsLoading(false);
    }
  };

  const signals = [
    {
      title: 'Juridisk garanti',
      text: 'Vi kontrollerar alla licenser, lagfarter och skulder innan köp.',
    },
    {
      title: 'Kontrakt på svenska',
      text: 'All dokumentation översätts och gås igenom på ditt språk.',
    },
    {
      title: 'Support efter köpet',
      text: 'Vi hjälper till med el, vatten, internet och renovering även efter tillträdet.',
    },
  ];

  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Side: Value Prop */}
          <div className="text-white">
            <span className="text-sand text-[10px] uppercase tracking-[0.25em] font-bold mb-4 block">
              Vår filosofi
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
              Trygg bostadsaffär <br />
              <span className="italic text-sand/90">i Spanien.</span>
            </h2>

            <p className="text-white/70 font-light text-lg mb-10 max-w-md leading-relaxed">
              Vi vet att ett bostadsköp i Spanien är en stor livshändelse.
              Därför har vi skapat en process som är lika säker som den är
              inspirerande.
            </p>

            <div className="space-y-8">
              {signals.map((item, i) => (
                <div key={i} className="flex gap-5 group cursor-default">
                  <div className="mt-1 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0 text-sand group-hover:bg-sand group-hover:text-navy transition-all duration-300">
                    <Check size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-white mb-1 group-hover:text-sand transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-white/50 font-light text-sm group-hover:text-white/70 transition-colors">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Contact Form Placeholder */}
          <div className="relative">
            <div className="absolute top-0 left-8 right-8 h-1 bg-sand z-20" />
            <div className="bg-white p-8 md:p-12 shadow-2xl rounded-lg relative z-10">
              <div className="mb-8">
                <h3 className="text-3xl font-serif text-navy mb-2">
                  Boka rådgivning
                </h3>
                <p className="text-gray-400 font-light text-sm">
                  Fyll i formuläret så kontaktar en av våra mäklare dig inom
                  24h.
                </p>
              </div>

              {isSubmitted ? (
                <div className="bg-green-50 p-8 rounded-lg text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    <Check size={32} />
                  </div>
                  <h3 className="text-xl font-serif text-navy mb-2">Tack för din förfrågan!</h3>
                  <p className="text-gray-500">
                    Vi har mottagit dina uppgifter och återkommer till dig inom 24 timmar.
                  </p>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-1.5 group">
                      <label className="text-[10px] uppercase tracking-widest text-sage font-bold group-focus-within:text-navy transition-colors">
                        Förnamn
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        className="w-full bg-greige/30 border border-transparent focus:bg-white focus:border-navy focus:ring-4 focus:ring-gray-100 transition-all duration-300 rounded-md px-4 py-3.5 text-sm outline-none placeholder-gray-400 text-charcoal"
                        placeholder="Anna"
                      />
                    </div>
                    <div className="space-y-1.5 group">
                      <label className="text-[10px] uppercase tracking-widest text-sage font-bold group-focus-within:text-navy transition-colors">
                        Efternamn
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        className="w-full bg-greige/30 border border-transparent focus:bg-white focus:border-navy focus:ring-4 focus:ring-gray-100 transition-all duration-300 rounded-md px-4 py-3.5 text-sm outline-none placeholder-gray-400 text-charcoal"
                        placeholder="Andersson"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 group">
                    <label className="text-[10px] uppercase tracking-widest text-sage font-bold group-focus-within:text-navy transition-colors">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-greige/30 border border-transparent focus:bg-white focus:border-navy focus:ring-4 focus:ring-gray-100 transition-all duration-300 rounded-md px-4 py-3.5 text-sm outline-none placeholder-gray-400 text-charcoal"
                      placeholder="anna@exempel.se"
                    />
                  </div>

                  <div className="space-y-1.5 group">
                    <label className="text-[10px] uppercase tracking-widest text-sage font-bold group-focus-within:text-navy transition-colors">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full bg-greige/30 border border-transparent focus:bg-white focus:border-navy focus:ring-4 focus:ring-gray-100 transition-all duration-300 rounded-md px-4 py-3.5 text-sm outline-none placeholder-gray-400 text-charcoal"
                      placeholder="+46..."
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-navy text-white py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-charcoal transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-navy/20 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed rounded-md"
                    >
                      {isLoading ? <Loader2 className="animate-spin" size={16} /> : 'Bli kontaktad'}
                    </button>
                    <p className="text-center text-[10px] text-gray-400 mt-4">
                      Genom att skicka godkänner du vår integritetspolicy.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
