export interface GolfCourse {
    // Identifiering
    id: string;
    slug: string;

    // Grundinfo
    name: string;
    shortName: string;
    tagline?: string;  // "Spaniens mest prisade bana"
    description: string;
    longDescription: string;

    // Plats
    region: 'costa-blanca' | 'costa-del-sol' | 'costa-calida' | 'costa-almeria';
    subRegion: string;
    province: string;
    municipality?: string;
    address: {
        street: string;
        postalCode: string;
        city: string;
        country: 'ES';
    };
    coordinates: {
        lat: number;
        lng: number;
    };

    // Banfakta
    courseInfo: {
        holes: 9 | 18 | 27 | 36 | 45 | 54;
        par: number;
        length: {
            meters: number;
            yards: number;
        };
        slopeRating?: number;
        courseRating?: number;
        architect: string;
        openedYear: number;
        renovatedYear?: number;
        grassType?: string;  // "Bermuda", "Paspalum"
        waterHazards?: number;
        bunkers?: number;
    };

    // Svårighetsgrad
    difficulty: {
        level: 'beginner' | 'easy' | 'low' | 'medium' | 'medium-high' | 'medium-hard' | 'high' | 'hard' | 'challenging' | 'expert';
        description: string;
    };

    handicapRequirement?: {
        men: number;
        women: number;
        softSpikes: boolean;
    };

    // Requirements (alternative format from Perplexity)
    requirements?: {
        handicap?: {
            men?: number;
            women?: number;
        };
        reservationRequired?: boolean;
        guestsWelcome?: boolean;
    };

    // Priser (KRITISKT - håll uppdaterat)
    pricing: {
        currency: 'EUR';
        priceSource?: string;
        lastUpdated: string;  // ISO date

        greenFee: {
            lowSeason: {
                weekday: { min: number; max: number };
                weekend: { min: number; max: number };
            };
            highSeason: {
                weekday: { min: number; max: number };
                weekend: { min: number; max: number };
            };
            midSeason?: {
                weekday: { min: number; max: number };
                weekend: { min: number; max: number };
            };
            twilight?: {
                weekday: { min: number; max: number };
                weekend: { min: number; max: number };
                startsAt: string;  // "14:00"
            };
            superTwilight?: {
                price: number;
                startsAt: string;
            };
            currentPeriod?: any;
        };


        extras: {
            buggy: number | null;
            buggy9Holes?: number | null;
            clubRental: number | null;
            trolley: number | null;
            electricTrolley?: number | null;
            rangeBalls: number | null;
            rangeBallsIncluded: boolean;
            locker?: number | null;
            towel?: number | null;
            [key: string]: number | boolean | string | null | undefined;
        };

        packages?: Array<{
            name: string;
            description: string;
            price: number;
            includes: string[];
        }>;

        discounts?: Array<{
            type: string;  // "Junior", "Senior", "Medlem", "Förbokning"
            percentage?: number;
            fixedPrice?: number;
            conditions?: string;
        }>;

        seasonDates?: {
            lowSeason: { from: string; to: string };  // "01-06" till "30-09"
            highSeason: { from: string; to: string };
        };

        averageGreenFee?: number;  // Average price for quick reference
        note?: string;  // Extra info about pricing
    };

    // öppettider
    openingHours?: {
        firstTee: {
            summer: string;
            winter: string;
        };
        lastTee: {
            summer: string;
            winter: string;
        };
        proshop: string;
        restaurant: string;
        drivingRange: string;
    };

    // Faciliteter
    facilities: {
        course: {
            drivingRange: boolean;
            drivingRangeCovered?: boolean;
            drivingRangeSpots?: number;
            puttingGreen: boolean;
            chippingGreen: boolean;
            practiceBunker: boolean;
        };
        clubhouse: {
            proshop: boolean;
            restaurant: boolean;
            bar: boolean;
            terrace: boolean;
            locker: boolean;
            shower: boolean;
            sauna?: boolean;
        };
        services: {
            golfSchool: boolean;
            proAvailable: boolean;
            clubFitting: boolean;
            clubRepair: boolean;
            caddie: boolean;
        };
        other: {
            spa?: boolean;
            pool?: boolean;
            gym?: boolean;
            tennis?: boolean;
            padel?: boolean;
            hotel?: boolean;
            realEstate?: boolean;  // Har eget bostadsområde
        };
    };

    // Dresscode
    dressCode?: {
        required: string[];
        notAllowed: string[];
        notes?: string;
    };

    // Kontakt
    contact: {
        phone: string;
        phoneInternational: string;
        email: string;
        website: string;
        bookingUrl?: string;
        socialMedia?: {
            facebook?: string;
            instagram?: string;
            twitter?: string;
            youtube?: string;
        };
    };

    // Transport
    transport?: {
        fromAirports: Array<{
            code: string;  // "ALC", "AGP"
            name: string;  // "Alicante-Elche"
            drivingMinutes: number;
            drivingKm: number;
        }>;
        nearestTown: {
            name: string;
            drivingMinutes: number;
        };
        publicTransport?: string;
        parkingInfo?: string;
    };

    // Hål-detaljer
    holes?: Array<{
        number: number;
        par: number;
        length?: number | {
            championship?: number;
            mens?: number;
            ladies?: number;
            meters?: number;
            yards?: number;
        };
        lengthMeters?: number;  // Alternative format
        lengthYards?: number;   // Alternative format
        distance?: number;      // Alternative format
        handicapIndex?: number;
        name?: string;          // Named holes
        description?: string;
        tips?: string;
        isSignatureHole?: boolean;
    }>;

    // Layout & Design
    courseLayout?: {
        par5s?: number;
        par4s?: number;
        par3s?: number;
        courseType?: string; // "Parkland", "Links", "Desert"
        waterInPlay?: boolean;
        treesInPlay?: boolean;
    };

    // History (for notable courses)
    history?: {
        inaugurated?: string;
        pgatourEvents?: Array<{
            year: number;
            event: string;
            winner?: string;
            courseRecord?: number;
        }>;
    };

    signatureHoles?: Array<{
        number?: number;
        hole?: number;       // alias for number
        holeNumber?: number; // Legacy/Compat
        par?: number;
        length?: number | {  // meters or full object
            meters?: number;
            yards?: number;
        };
        name?: string;
        description: string;
    }>;

    // Bästa tid att spela
    bestTimeToPlay?: {
        january: { rating: 1 | 2 | 3 | 4 | 5; notes?: string };
        february: { rating: 1 | 2 | 3 | 4 | 5; notes?: string };
        march: { rating: 1 | 2 | 3 | 4 | 5; notes?: string };
        april: { rating: 1 | 2 | 3 | 4 | 5; notes?: string };
        may: { rating: 1 | 2 | 3 | 4 | 5; notes?: string };
        june: { rating: 1 | 2 | 3 | 4 | 5; notes?: string };
        july: { rating: 1 | 2 | 3 | 4 | 5; notes?: string };
        august: { rating: 1 | 2 | 3 | 4 | 5; notes?: string };
        september: { rating: 1 | 2 | 3 | 4 | 5; notes?: string };
        october: { rating: 1 | 2 | 3 | 4 | 5; notes?: string };
        november: { rating: 1 | 2 | 3 | 4 | 5; notes?: string };
        december: { rating: 1 | 2 | 3 | 4 | 5; notes?: string };
    };

    // Tips & Rekommendationer
    tips?: {
        general: string[];
        forBeginners?: string[];
        forExperts?: string[];
        localKnowledge?: string[];
    };

    // Media
    media?: {
        heroImage: string;
        logo?: string;
        gallery: Array<{
            url: string;
            alt: string;
            caption?: string;
            isHole?: number;  // Om bilden visar ett specifikt hål
        }>;
        video?: {
            url: string;
            type: 'youtube' | 'vimeo' | 'direct';
        };
        virtualTour?: string;
        courseMap?: string;  // Bild på bankartan
    };

    // Betyg & Recensioner
    rating: {
        overall: number;  // 4.8
        totalReviews: number;
        breakdown?: {
            courseCondition: number;
            value: number;
            facilities: number;
            service: number;
            difficulty: number;
        };
        awards?: string[];  // "Top 100 Europe", "Best Course Costa Blanca"
    };

    // Koppling till fastigheter
    propertyConnection?: {
        hasResidentialArea: boolean;
        nearbyPropertyCount?: number;  // Antal fastigheter inom 10 min
        frontlineGolfCount?: number;   // Antal frontline golf
        linkedPropertySlugs?: string[];  // Direktlänk till specifika fastigheter
    };

    // SEO
    seo?: {
        title: string;
        description: string;
        keywords: string[];
        canonicalUrl?: string;
    };

    // Metadata
    meta?: {
        isActive: boolean;
        isFeatured: boolean;
        isPremiumPartner: boolean;  // Om de betalar för extra exponering
        createdAt: string;
        updatedAt: string;
        dataSource: string;  // "perplexity", "manual", "official_website"
        verifiedAt?: string;
    };

    // Opening hours (alternative format from Perplexity)
    hours?: {
        monday?: string;
        tuesday?: string;
        wednesday?: string;
        thursday?: string;
        friday?: string;
        saturday?: string;
        sunday?: string;
    };

    // Google Places integration
    googlePlaceId?: string;

    // Allow any additional fields from Perplexity
    [key: string]: unknown;
}

export interface GolfReview {
    id: string;
    courseId: string;
    author: {
        name: string;
        country: string;
        handicap?: number;
        avatar?: string;
        isVerified: boolean;
    };
    rating: {
        overall: number;
        courseCondition?: number;
        value?: number;
        facilities?: number;
        service?: number;
    };
    content: {
        title: string;
        text: string;
        pros?: string[];
        cons?: string[];
    };
    playedDate: string;
    createdAt: string;
    helpfulCount: number;
    isHighlighted: boolean;
}

export interface GolfRegion {
    id: string;
    slug: string;
    name: string;
    description: string;
    longDescription: string;
    heroImage: string;
    courseCount: number;
    priceRange: { min: number; max: number };
    highlights: string[];
    climate: {
        avgTemperatureWinter: number;
        avgTemperatureSummer: number;
        rainyDays: number;
        sunnyDays: number;
    };
    seo: {
        title: string;
        description: string;
        keywords: string[];
    };
}

export type GolfDifficulty = 'beginner' | 'easy' | 'low' | 'medium' | 'medium-high' | 'high' | 'hard' | 'challenging' | 'expert';

export interface GolfFilter {
    region?: 'costa-blanca' | 'costa-del-sol' | 'costa-calida' | 'costa-almeria';
    subRegion?: string;
    priceMin?: number;
    priceMax?: number;
    holes?: 9 | 18 | 27;
    difficulty?: GolfDifficulty;
    facilities?: string[];
    minRating?: number;
    hasProShop?: boolean;
    hasRestaurant?: boolean;
    hasGolfSchool?: boolean;
    sortBy?: 'rating' | 'price-low' | 'price-high' | 'name' | 'popularity';
}
