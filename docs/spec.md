  
**SPANIENFASTIGHETER**  
Företags- & Kundportal

Komplett Specifikation

Version 1.0 \- Januari 2026

# **Innehållsförteckning**

1\. Projektöversikt

2\. Teknisk Arkitektur

3\. Roller & Behörigheter

4\. Provisionsstruktur

5\. Moduler \- Företagsportal

6\. Moduler \- Kundportal

7\. Köpprocessen (6 steg)

8\. Visningsrapporter

9\. Objektutskick

10\. After-Sales

11\. Integrationer

12\. Databas-schema

13\. Implementationsfaser

# **1\. Projektöversikt**

## **1.1 Bakgrund**

Spanienfastigheter.se är en svensk plattform för försäljning av fastigheter i Spanien, primärt riktad mot svenska köpare. Företaget behöver ett komplett system för att hantera hela verksamheten från lead-generering till after-sales.

## **1.2 Mål**

* Centraliserad hantering av leads, kunder och affärer  
* Full kontroll över köpprocessen i 6 steg  
* Transparent provisionshantering för partners och agenter  
* Självbetjäningsportal för kunder  
* Skalbar arkitektur för framtida tillväxt

## **1.3 Systemöversikt**

Systemet består av tre huvuddelar:

| Del | Beskrivning | Användare |
| :---- | :---- | :---- |
| Publik hemsida | Sök och visa fastigheter, kontaktformulär | Alla besökare |
| Företagsportal | CRM, leads, deals, visningar, rapporter | Internt team, partners, agenter |
| Kundportal | Mina objekt, köpprocess, dokument | Registrerade kunder |

# **2\. Teknisk Arkitektur**

## **2.1 Tech Stack**

| Lager | Teknologi | Syfte |
| :---- | :---- | :---- |
| Frontend | Next.js 14 (App Router) | SSR, routing, UI |
| Styling | Tailwind CSS | Responsiv design |
| Backend | Convex | Databas, API, realtime |
| Auth | Clerk | Autentisering, OAuth |
| Email | Resend | Transaktionella emails |
| SMS | Twilio (senare) | SMS-notiser |
| Chat | Tidio (start) → WhatsApp | Kundkommunikation |
| Bilder | Next.js Image \+ Cloudinary | Bildoptimering |
| Analytics | PostHog \+ Google Analytics | Spårning, heatmaps |
| Hosting | Vercel \+ Convex Cloud | Deployment |

## **2.2 URL-struktur**

| Route | Beskrivning | Åtkomst |
| :---- | :---- | :---- |
| / | Publik hemsida | Alla |
| /fastigheter | Söksida | Alla |
| /fastigheter/\[ref\] | Objektsida | Alla |
| /admin/\* | Företagsportal | Autentiserade (roller) |
| /portal/\* | Kundportal | Autentiserade kunder |
| /api/webhooks/\* | Externa webhooks | System |

## **2.3 Dataflöde**

XML-feed (REDSP) → Convex Sync Action → Convex Database → Next.js Frontend

Synkning sker automatiskt varje timme via Convex Cron Jobs.

# **3\. Roller & Behörigheter**

## **3.1 Rollhierarki**

| Roll | Beskrivning | Nivå |
| :---- | :---- | :---- |
| Owner | Ägare med full kontroll | 100 |
| Equity Partner | Delägare med full insyn | 90 |
| Admin | Anställd med admin-access | 80 |
| Sales Partner | Mäklarpartner i Spanien (provision) | 50 |
| Agent | Säljagent i Sverige (provision) | 40 |
| Referral | Engångstipsare (finder's fee) | 20 |
| Customer | Registrerad kund | 10 |

## **3.2 Behörighetsmatris**

| Funktion | Owner | Equity | Admin | Partner | Agent | Customer |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Dashboard (alla KPIs) | ✓ | ✓ | ✓ | – | – | – |
| Alla leads | ✓ | ✓ | ✓ | – | – | – |
| Egna leads | ✓ | ✓ | ✓ | ✓ | ✓ | – |
| Alla deals | ✓ | ✓ | ✓ | – | – | – |
| Egna deals | ✓ | ✓ | ✓ | ✓ | – | – |
| Provisionsrapporter | ✓ | ✓ | ✓ | Egna | Egna | – |
| Finansiella rapporter | ✓ | ✓ | – | – | – | – |
| Objekthantering | ✓ | ✓ | ✓ | – | – | – |
| Användarhantering | ✓ | – | ✓ | – | – | – |
| Systeminställningar | ✓ | Visa | ✓ | – | – | – |
| Kundportal | – | – | – | – | – | ✓ |

## **3.3 Equity Partner vs Sales Partner**

Viktigt att skilja på dessa två roller:

| Aspekt | Equity Partner | Sales Partner |
| :---- | :---- | :---- |
| Ägarandel | Ja (X% av bolaget) | Nej |
| Inkomst | Vinstdelning | Provision per affär |
| Insyn | Full (alla affärer) | Begränsad (egna) |
| Beslut | Strategiska | Inga |
| Risk | Delar risk | Ingen risk |

# **4\. Provisionsstruktur**

## **4.1 Provisionstyper**

| Typ | Beskrivning | Exempel |
| :---- | :---- | :---- |
| Fast procent | Samma % på alla affärer | 20% av provision |
| Trappsteg | Ökande % baserat på antal avslut | 1-2 affärer: 15%, 3-5: 20% |
| Per affär | Individuellt satt per deal | Förhandlas |

## **4.2 Trappstegsmodell för Agenter**

| Antal avslut/år | Provisionsnivå |
| :---- | :---- |
| 1-2 affärer | 15% |
| 3-5 affärer | 20% |
| 6-10 affärer | 25% |
| 10+ affärer | 30% \+ bonus |

## **4.3 Lead Attribution**

Regler för vem som äger en lead:

* Lead tillhör agenten i 12 månader från första kontakt  
* Om kunden köper inom perioden → Agent får provision  
* Efter 12 månader utan aktivitet → Leaden blir fri

## **4.4 Provisionsfördelning \- Exempel**

| Scenario | Agent | Partner | Företaget |
| :---- | :---- | :---- | :---- |
| Agent ger lead, företaget säljer | 20% | – | 80% |
| Agent ger lead, Partner visar & säljer | 15% | 25% | 60% |
| Företaget hittar lead, Partner visar | – | 30% | 70% |
| Kund kommer direkt, företaget säljer | – | – | 100% |

# **5\. Moduler \- Företagsportal**

## **5.1 Dashboard**

Snabb överblick över hela verksamheten.

| Widget | Beskrivning |
| :---- | :---- |
| KPI-kort | Antal leads, visningar, aktiva objekt, stängda affärer |
| Pipeline-översikt | Visualisering av leads genom säljtratten |
| Senaste aktivitet | Nya leads, bokade visningar, kundkontakter |
| Snabbåtgärder | Lägg till lead, boka visning, skapa utskick |
| Försäljningsmål | Progress mot månatliga/kvartalsmål |
| Kommande visningar | Nästa 7 dagars bokningar |

## **5.2 CRM & Leads**

### **Lead Management**

| Funktion | Beskrivning |
| :---- | :---- |
| Lead capture | Automatisk import från hemsidan, email, telefon |
| Lead scoring | Poängsätt leads baserat på aktivitet och intresse |
| Lead assignment | Tilldela leads till säljare automatiskt eller manuellt |
| Status-pipeline | Ny → Kontaktad → Kvalificerad → Visning → Förhandling → Avslutad |
| Duplett-hantering | Identifiera och slå ihop dubbletter |

### **Kundprofiler**

| Fält | Beskrivning |
| :---- | :---- |
| Kontaktinfo | Namn, email, telefon, adress |
| Preferenser | Budget, antal sovrum, region, objekttyp, must-haves |
| Kommunikationshistorik | Alla email, samtal, möten loggade |
| Dokument | Köpekontrakt, ID-handlingar, finansieringsbevis |
| KYC-status | Kundkännedom för AML/penningtvätt |

## **5.3 Objekthantering**

| Funktion | Beskrivning |
| :---- | :---- |
| Objektlista | Lista/grid-vy med filter och sök |
| Status | Aktiv, Reserverad, Såld, Pausad, Arkiverad |
| Featured | Markera som utvald på startsidan |
| Override | Egna priser, beskrivningar, bilder |
| Sync | Manuell trigger av XML-sync |
| Provision | Sätt provision per objekt |

## **5.4 Deals/Affärer**

Hantering av pågående affärer genom köpprocessens 6 steg.

| Funktion | Beskrivning |
| :---- | :---- |
| Pipeline-vy | Drag-and-drop mellan steg |
| Deal-detaljer | Kund, objekt, pris, status, datum |
| Checklista | Per-steg uppgifter att bocka av |
| Dokument | Kontrakt, NIE, betalningsbevis |
| Provision | Beräknad provision och fördelning |

## **5.5 Visningar & Kalender**

| Funktion | Beskrivning |
| :---- | :---- |
| Kalendervy | Dag/vecka/månad-vy |
| Boka visning | Koppla kund \+ objekt \+ tid \+ partner |
| Påminnelser | Auto-påminnelse till kund och mäklare |
| Visningsrapport | Fylls i efter visning (se sektion 8\) |
| Google Calendar sync | Tvåvägs-synkronisering |

## **5.6 Rapporter & Analys**

| Rapport | Innehåll |
| :---- | :---- |
| Försäljningsstatistik | Stängda affärer per månad/kvartal/år |
| Pipeline-rapport | Värde i varje pipeline-steg |
| Konverteringsgrad | Lead → Visning → Köp |
| Lead-källor | Varifrån kommer leads? |
| Populära objekt | Mest visade/sparade objekt |
| Provisionöversikt | Förväntad och realiserad provision |

## **5.7 Team-hantering**

| Funktion | Beskrivning |
| :---- | :---- |
| Användare | Skapa/redigera/inaktivera |
| Roller | Tilldela roll och behörigheter |
| Provisionsprofil | Koppla till provisionsmodell |
| Aktivitetslogg | Vem gjorde vad och när |
| Prestanda | KPIs per person |

# **6\. Moduler \- Kundportal**

## **6.1 Kundens Dashboard**

Personlig översikt för inloggade kunder.

| Widget | Beskrivning |
| :---- | :---- |
| Köpprocess-status | Visuell progress genom 6 stegen |
| Nästa uppgift | Vad kunden behöver göra |
| Sparade objekt | Favoriter |
| Meddelanden | Olästa från mäklare |
| Kommande visningar | Bokade visningar |

## **6.2 Funktioner**

| Funktion | Beskrivning |
| :---- | :---- |
| Mina sparade objekt | Favoriter med anteckningar |
| Sparade sökningar | Filter med notis vid nya matchningar |
| Mina visningar | Bokade och genomförda |
| Min köpprocess | Detaljerad vy med checklista |
| Mina dokument | Kontrakt, ID, NIE, etc. |
| Meddelanden | Chat med mäklare |
| After-sales tjänster | Uthyrning, förvaltning, etc. |

## **6.3 Sökbevakning**

Kunden kan spara sökfilter och få notis när nya matchande objekt läggs upp.

| Inställning | Alternativ |
| :---- | :---- |
| Notis-frekvens | Direkt / Dagligen / Veckovis |
| Kanal | Email / Push / SMS |
| Filter | Region, typ, pris, sovrum, etc. |

# **7\. Köpprocessen (6 steg)**

Komplett flöde från intresseanmälan till nycklar.

## **Steg 1: Reservation**

**Vad händer:** Kunden betalar reservationsavgift (3 000 \- 6 000 €) för att ta objektet från marknaden.

**Tid:** 3-7 dagar till kontraktsskrivning

Kundens uppgifter:

* Betala reservationsavgift  
* Ladda upp pass/ID

## **Steg 2: Köpekontrakt (Contrato de Arras)**

**Vad händer:** Bindande avtal skrivs. Handpenning på 10% betalas.

**Tid:** 1-2 veckor

Kundens uppgifter:

* Ansöka om NIE-nummer  
* Granska och signera kontrakt  
* Betala handpenning (10%)  
* Välja advokat

## **Steg 3: Due Diligence**

**Vad händer:** Advokaten granskar äganderätt, skulder, bygglov, etc.

**Tid:** 2-4 veckor

Granskningspunkter:

* Nota Simple (fastighetsregisterutdrag)  
* Skulder och inteckningar  
* Bygglov och legalitet  
* Kommunala avgifter (IBI)  
* Samfällighetsavgifter

## **Steg 4: Escritura (Notarie)**

**Vad händer:** Officiell överlåtelse hos notarie. Slutbetalning (90%).

**Tid:** 1-2 veckor för förberedelse, sedan 1 dag hos notarie

Kundens uppgifter:

* Boka flyg/hotell (eller ordna fullmakt)  
* Överföra slutbetalning i tid  
* Ta med pass \+ NIE (original)

## **Steg 5: Nycklar & Tillträde**

**Vad händer:** Nycklar överlämnas, mätaravläsningar, inventering.

**Tid:** Samma dag som Escritura

Kundens uppgifter:

* Ta emot alla nycklar  
* Fotografera mätarställningar  
* Gå igenom inventarielista  
* Signera överlämningsprotokoll

## **Steg 6: After-Sales**

**Vad händer:** Uppföljning och merförsäljning av tjänster.

Se sektion 10 för detaljer.

# **8\. Visningsrapporter**

System för partners att rapportera efter genomförda visningar.

## **8.1 Rapportinnehåll**

### **Per objekt som visades**

| Fält | Beskrivning |
| :---- | :---- |
| Reaktion | Älskade / Gillade / Neutral / Gillade ej |
| Intressenivå | 1-5 stjärnor |
| Fördelar | Vad gillade kunden? |
| Nackdelar | Vad gillade de inte? |
| Prisdiskussion | För dyrt / Rimligt / Bra pris |
| Vill se igen? | Ja / Nej / Kanske |
| Foton | Bilder från visningen |

### **Kundens övergripande feedback**

| Fält | Beskrivning |
| :---- | :---- |
| Favorit-objekt | Vilket objekt var bäst? |
| Budget-uppdatering | Har budgeten ändrats? |
| Nya önskemål | Nya krav som framkommit |
| Tidshorisont | När vill de köpa? |
| Finansiering | Status på lån/kapital |
| Beslutsfattare | Vem bestämmer? |

### **Mäklarens bedömning**

| Fält | Alternativ |
| :---- | :---- |
| Köpsannolikhet | Låg / Medium / Hög / Mycket hög |
| Mognad | Tidigt skede / Aktiv sökning / Redo att köpa |
| Hinder | Pris / Finansiering / Partner oense / Hittar ej rätt |
| Rekommendation | Fortsätt söka / Lägg bud / Vänta |

### **Nästa steg**

| Fält | Beskrivning |
| :---- | :---- |
| Överenskommen action | Vad bestämdes? |
| Ny visning? | Vill de se fler objekt? |
| Bud? | Överväger de att lägga bud? |
| Uppföljning | Vem ringer och när? |

## **8.2 Automatiska triggers**

| Trigger | Action |
| :---- | :---- |
| Rapport ej ifylld inom 24h | Påminnelse till Partner |
| Köpsannolikhet \= Mycket hög | Notis till Owner direkt |
| Kund vill lägga bud | Skapa uppgift: Ring kund |

# **9\. Objektutskick**

Funktion för att skicka personligt urval av objekt till kunder.

## **9.1 Flöde**

1\. Välj objekt (1-5 st) → 2\. Välj mall → 3\. Anpassa meddelande → 4\. Förhandsgranska → 5\. Skicka

## **9.2 Mallar**

| Mall | Beskrivning |
| :---- | :---- |
| Elegant | Ljus, premium-känsla med stora bilder |
| Modern | Stilren med fokus på features |
| Kompakt | Sammanfattande, mindre bilder |
| PDF-broschyr | Nedladdningsbar PDF istället för email |

## **9.3 Funktioner**

| Funktion | Beskrivning |
| :---- | :---- |
| Snabbval från lead | Auto-välj baserat på kundens preferenser |
| Personligt meddelande | Skriv eget intro till kunden |
| Schemalägg | Skicka vid specifik tidpunkt |
| Tracking | Se om kunden öppnat, klickat |
| Historik | Alla tidigare utskick till kunden |
| WhatsApp-dela | Skicka som länk via WhatsApp |

## **9.4 Åtkomst**

Objektutskick kan skapas från:

* Lead-profilen (knapp 'Skicka objektutskick')  
* Objektsidan (knapp 'Lägg till i utskick')  
* Söksidan (multi-select \+ 'Skapa utskick')

# **10\. After-Sales**

Uppföljning och merförsäljning efter köp.

## **10.1 Första månaden**

| Uppgift | Ansvar |
| :---- | :---- |
| Ändra el-kontrakt | Advokat/Företaget hjälper |
| Ändra vatten-kontrakt | Advokat/Företaget hjälper |
| Anmäla till samfälligheten | Advokat/Företaget hjälper |
| Teckna hemförsäkring | Kund (vi rekommenderar) |
| Ordna internet/TV | Kund (vi ger tips) |

## **10.2 Löpande tjänster (Intäktsmöjligheter)**

| Tjänst | Beskrivning | Intäkt |
| :---- | :---- | :---- |
| Nyckelförvaltning | Någon kollar till huset | Referral fee |
| Uthyrning | Airbnb/långtidsuthyrning | % av hyra |
| Pool/trädgård | Löpande underhåll | Referral fee |
| Renovering | Kontakt med hantverkare | Referral fee |
| Möblering | Inredningshjälp | Referral fee |
| Skatterådgivning | Spansk deklaration | Referral fee |
| Sälj igen | När de vill sälja | Full provision |

## **10.3 Automatiska uppföljningar**

| Tidpunkt | Action |
| :---- | :---- |
| 1 månad efter köp | Hur går det? Behöver du hjälp? |
| 6 månader | Dags att deklarera \- vi hjälper\! |
| 1 år | Grattis på årsdagen\! Värdeutveckling. |
| Löpande | Notis vid prisändringar i området |

# **11\. Integrationer**

## **11.1 Aktiva integrationer**

| System | Typ | Användning |
| :---- | :---- | :---- |
| REDSP XML | Data-sync | Fastighetsfeed |
| Clerk | Auth | Inloggning, OAuth |
| Resend | Email | Transaktionella emails |
| PostHog | Analytics | Spårning, heatmaps |
| Google Analytics | Analytics | SEO-koppling |
| Cloudinary | Media | Bildhantering |
| Tidio | Chat | Livechatt på hemsidan |

## **11.2 Planerade integrationer**

| System | Typ | När |
| :---- | :---- | :---- |
| Twilio | SMS | Fas 2 |
| WhatsApp Business | Chat | När volym/budget finns |
| Google Calendar | Kalender | Fas 2 |
| Stripe | Betalning | Vid behov |

## **11.3 Webhook-endpoints**

| Endpoint | Källa | Syfte |
| :---- | :---- | :---- |
| /api/webhooks/resend | Resend | Email-status (delivered, opened) |
| /api/webhooks/clerk | Clerk | User events |
| /api/external/lead | Externt | Lead-inmatning från partners |

# **12\. Databas-schema (Convex)**

## **12.1 Huvudtabeller**

| Tabell | Beskrivning | Index |
| :---- | :---- | :---- |
| users | Alla användare (team \+ kunder) | email, role, clerkId |
| properties | Fastigheter från XML \+ egna | ref, region, status, featured |
| leads | Leads/prospekt | email, status, assignedTo |
| deals | Pågående affärer | stage, leadId, propertyId |
| viewings | Visningar | leadId, scheduledAt, status |
| documents | Uppladdade dokument | dealId, type |
| communications | Email, SMS, anteckningar | leadId, dealId, type |
| tasks | Uppgifter | assignedTo, status, dueAt |
| commissionProfiles | Provisionsmodeller | – |
| activityLog | Aktivitetslogg | userId, createdAt |

## **12.2 Relationer**

Lead → Deal → Property

Lead → Viewings → Properties (many)

Deal → Documents

User → Leads (assigned)

User → CommissionProfile

## **12.3 KYC/AML-fält på Leads**

| Fält | Typ | Beskrivning |
| :---- | :---- | :---- |
| kycStatus | enum | not\_started, in\_progress, completed, flagged |
| kycCompletedAt | datetime | När KYC godkändes |
| idDocumentId | ref | Länk till uppladdat ID |
| fundsSource | string | Pengars ursprung |

# **13\. Implementationsfaser**

## **Fas 1: MVP (2-3 veckor)**

Minsta fungerande version för daglig drift.

| Modul | Funktioner |
| :---- | :---- |
| Dashboard | Basic KPIs, senaste aktivitet |
| Objekthantering | Featured, dölj, sync-trigger |
| Lead-lista | Manuell inmatning, status, tilldelning |
| Användarhantering | Skapa användare, tilldela roll |

## **Fas 2: CRM Core (3-4 veckor)**

Fullständig kundhantering.

| Modul | Funktioner |
| :---- | :---- |
| Lead pipeline | Drag-and-drop, automatisk scoring |
| Kundprofiler | Preferenser, historik, dokument |
| Kommunikation | Email-mallar, loggning |
| Påminnelser | Automatiska follow-ups |

## **Fas 3: Visningar & Kalender (2 veckor)**

| Modul | Funktioner |
| :---- | :---- |
| Kalender | Dag/vecka/månad-vy |
| Visningsbokning | Koppla lead \+ objekt \+ partner |
| Visningsrapport | Mobilvänligt formulär |
| Google Calendar | Tvåvägs-sync |

## **Fas 4: Deals & Köpprocess (3 veckor)**

| Modul | Funktioner |
| :---- | :---- |
| Deal pipeline | 6-stegs flöde |
| Checklista | Per-steg uppgifter |
| Dokument | Uppladdning, signering |
| Kundportal | Progress-vy för kund |

## **Fas 5: Rapporter & Provision (2 veckor)**

| Modul | Funktioner |
| :---- | :---- |
| Rapporter | Försäljning, leads, pipeline |
| Provision | Beräkning, fördelning, utbetalning |
| Export | Excel, PDF |

## **Fas 6: Objektutskick & After-Sales (2 veckor)**

| Modul | Funktioner |
| :---- | :---- |
| Objektutskick | Mallar, personalisering, tracking |
| After-sales | Uppföljningar, tjänster |
| Kundportal v2 | Tjänster, sökbevakning |

## **Total estimerad tid: 14-18 veckor**

# **Appendix**

## **A. Miljövariabler**

| Variabel | Källa | Var |
| :---- | :---- | :---- |
| NEXT\_PUBLIC\_CONVEX\_URL | Convex | Vercel \+ local |
| CONVEX\_DEPLOYMENT | Convex | Vercel \+ local |
| NEXT\_PUBLIC\_CLERK\_PUBLISHABLE\_KEY | Clerk | Vercel \+ local |
| CLERK\_SECRET\_KEY | Clerk | Vercel \+ local |
| RESEND\_API\_KEY | Resend | Convex \+ Vercel |
| NEXT\_PUBLIC\_POSTHOG\_KEY | PostHog | Vercel \+ local |
| NEXT\_PUBLIC\_POSTHOG\_HOST | PostHog | Vercel \+ local |
| CLOUDINARY\_CLOUD\_NAME | Cloudinary | Vercel |
| CLOUDINARY\_API\_KEY | Cloudinary | Vercel |
| CLOUDINARY\_API\_SECRET | Cloudinary | Vercel |
| XML\_FEED\_URL | REDSP | Convex |

## **B. Kontaktpunkter**

| System | URL |
| :---- | :---- |
| Vercel Dashboard | vercel.com/dashboard |
| Convex Dashboard | dashboard.convex.dev |
| Clerk Dashboard | dashboard.clerk.com |
| Resend Dashboard | resend.com/emails |
| PostHog Dashboard | eu.posthog.com |
| Cloudinary Console | cloudinary.com/console |

— Slut på dokument —