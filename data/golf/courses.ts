import { GolfCourse } from '@/types/golf';

export const GOLF_COURSES: GolfCourse[] = [
  {
    "id": "alenda",
    "slug": "alenda",
    "name": "Alenda Golf",
    "shortName": "Alenda Golf",
    "tagline": "Paradis för golfälskare med spektakulär utsikt",
    "description": "Alenda Golf är en naturskön 18-hålsbana i Costa Blanca med par 72 och 6257 meter. Byggd med respekt för naturen vid Sierra de Las Aguilas.",
    "longDescription": "Alenda Golf, designad av Roland Favrat och invigd 1999, ligger vid foten av Sierra de Las Aguilas bergen i Costa Blanca. Banan erbjuder en varierad 18-hålsupplevelse med par 72 över 6257 meter från de vita tees. De första nio hålen har breda fairways som kräver precision snarare än kraft, medan de sista nio är mer tekniska med undulerande greener som utmanar puttningen.\n\nBanan är platt till medelsvår med kortare avstånd mellan hål för snabba ronder. Den passar alla nivåer men kräver alla klubbor i bagen, särskilt på de knepiga greenerna där flaggplaceringar varieras regelbundet. Utsikten över Medelhavet och bergen gör upplevelsen oförglömlig, kombinerat med ett behagligt klimat.\n\nMed driving range, bunker- och pitchområde samt puttinggreen är faciliteterna utmärkta. Klubbhuset har restaurang, pro shop och gym med fantastisk panoramautsikt.",
    "region": "costa-blanca",
    "subRegion": "Monforte del Cid",
    "province": "Alicante",
    "address": {
      "street": "Avenida del Mediterráneo 52",
      "postalCode": "03679",
      "city": "Monforte del Cid",
      "country": "ES"
    },
    "coordinates": {
      "lat": 38.359500000000004,
      "lng": -0.67238
    },
    "courseInfo": {
      "holes": 18,
      "par": 72,
      "length": {
        "meters": 6257,
        "yards": 6840
      },
      "architect": "Roland Favrat",
      "openedYear": 1999
    },
    "difficulty": {
      "level": "medium",
      "description": "Medelsvår parkbana med platt layout, tekniska greener och krav på precision framför kraft."
    },
    "pricing": {
      "greenFee": {
        "highSeason": {
          "weekday": {
            "min": 102,
            "max": 102
          },
          "weekend": {
            "min": 102,
            "max": 102
          }
        },
        "lowSeason": {
          "weekday": {
            "min": 95,
            "max": 95
          },
          "weekend": {
            "min": 95,
            "max": 95
          }
        },
        "currentPeriod": {
          "date": "2026-01-26 to 2026-05-31",
          "18holes": 102,
          "9holes": 0,
          "twilight": "consult caddymaster"
        }
      },
      "currency": "EUR",
      "priceSource": "https://www.alendagolf.com/en/rates-and-offers/ and https://www.golf-service.com/book/tee-times/select-tee-time.asp?corid=97",
      "lastUpdated": "2026-01-21T21:04:48.833Z",
      "extras": {
        "buggy": 40,
        "clubRental": 30,
        "trolley": 5,
        "rangeBalls": 5,
        "rangeBallsIncluded": false,
        "buggy_18holes": 40,
        "buggy_9holes": 20,
        "electricTrolley_18holes": 10,
        "electricTrolley_9holes": 8,
        "juniorGreenFee_18holes": 51
      },
      "seasonDates": {
        "highSeason": {
          "from": "01-10",
          "to": "31-05"
        },
        "lowSeason": {
          "from": "01-06",
          "to": "30-09"
        }
      }
    },
    "facilities": {
      "course": {
        "drivingRange": true,
        "puttingGreen": true,
        "chippingGreen": true,
        "practiceBunker": true
      },
      "clubhouse": {
        "restaurant": true,
        "proshop": true,
        "locker": true,
        "bar": true,
        "terrace": true,
        "shower": true
      },
      "services": {
        "golfSchool": true,
        "proAvailable": true,
        "clubFitting": false,
        "clubRepair": false,
        "caddie": false
      },
      "other": {
        "spa": false,
        "pool": false,
        "gym": true,
        "tennis": false,
        "padel": false,
        "hotel": false
      }
    },
    "contact": {
      "phone": "+34 965 620 521",
      "email": "caddymaster@alendagolf.com",
      "website": "www.alendagolf.com",
      "phoneInternational": "+34 965 620 521"
    },
    "rating": {
      "overall": 4.3,
      "totalReviews": 1171
    },
    "holes": [],
    "signatureHoles": [
      {
        "number": 16,
        "description": "Knepiga 16:e hålet kräver stor koncentration med vatten och sluttande green."
      }
    ],
    "googlePlaceId": "ChIJJdfZXNPLYw0RIDbQ1G-vAg8",
    "media": {
      "heroImage": "/images/golf/alenda-hero.png",
      "gallery": []
    }
  },
  {
    "id": "aloha",
    "slug": "aloha",
    "name": "Aloha Golf Club",
    "shortName": "Aloha Golf",
    "tagline": "En av Spaniens vackraste och bäst underhållna banor i Golfdalen",
    "description": "Aloha Golf Club är en prestigefylld bana i Marbellas Golfdal med par 72, trädbevakade fairways och sjöar. Designad av Javier Arana 1975 med fantastisk utsikt.[1][2]",
    "longDescription": "Aloha Golf Club, belägen i Nueva Andalucía i Marbellas Golfdal, är en av Costa del Sols mest respekterade och välunderhållna banor. Designad av Javier Arana och invigd 1975, erbjuder den en parklandbana med par 72, uppdelad i 4 par 5, 10 par 4 och 4 par 3. Banan mäter cirka 6246 meter från de vita tee och präglas av smala, trädbevakade fairways, sjöar och bäckar som kräver precision och kraft från spelaren.[1][2][3]\n\nLayouten slingrar sig genom varierad vegetation med utsikt över La Concha-berget och Medelhavet. De snabba, välförsvarade greenerna ställer höga krav på järnspel och putting. Banan har en naturlig karaktär där varje dag känns unik tack vare årstidsvariationer i träd och buskar.[1][3]\n\nUpplevelsen förstärks av den lyxiga klubbhuset med terrass, restaurang och utmärkta faciliteter. Som privat medlemsklubb med historia av professionella turneringar ger Aloha en social och exklusiv atmosfär för golfentusiaster.[1][4]",
    "region": "costa-del-sol",
    "subRegion": "Nueva Andalucía",
    "province": "Málaga",
    "address": {
      "street": "Urb. Aloha Golf, s/n",
      "postalCode": "29660",
      "city": "Marbella",
      "country": "ES"
    },
    "coordinates": {
      "lat": 36.508,
      "lng": -4.926
    },
    "courseInfo": {
      "holes": 18,
      "par": 72,
      "length": {
        "meters": 6246,
        "yards": 6830
      },
      "architect": "Javier Arana",
      "openedYear": 1975
    },
    "difficulty": {
      "level": "medium",
      "description": "Banan kräver precision på smala fairways med träd och sjöar, plus snabba greener som testar järnspel och putting."
    },
    "pricing": {
      "greenFee": {
        "lowSeason": {
          "weekday": {
            "min": 0,
            "max": 0
          },
          "weekend": {
            "min": 0,
            "max": 0
          }
        },
        "highSeason": {
          "weekday": {
            "min": 0,
            "max": 0
          },
          "weekend": {
            "min": 0,
            "max": 0
          }
        }
      },
      "currency": "EUR",
      "seasonDates": {
        "highSeason": {
          "from": "01-10",
          "to": "31-05"
        },
        "lowSeason": {
          "from": "01-06",
          "to": "30-09"
        }
      },
      "lastUpdated": "2026-01-22T01:38:24.963Z",
      "extras": {
        "buggy": 40,
        "clubRental": 30,
        "trolley": 5,
        "rangeBalls": 4,
        "rangeBallsIncluded": false
      }
    },
    "facilities": {
      "course": {
        "drivingRange": true,
        "puttingGreen": true,
        "chippingGreen": true,
        "practiceBunker": true
      },
      "clubhouse": {
        "restaurant": true,
        "proshop": true,
        "locker": true,
        "bar": true,
        "terrace": true,
        "shower": true
      },
      "services": {
        "golfSchool": true,
        "proAvailable": true,
        "clubFitting": false,
        "clubRepair": false,
        "caddie": true
      },
      "other": {
        "spa": false,
        "pool": true,
        "gym": true,
        "tennis": false,
        "padel": false,
        "hotel": false
      }
    },
    "contact": {
      "phone": "+34 952 90 70 85",
      "email": "reservas@clubdegolfaloha.com",
      "website": "www.clubdegolfaloha.com",
      "phoneInternational": "+34 952 90 70 85"
    },
    "rating": {
      "overall": 4.6,
      "totalReviews": 589
    },
    "holes": [],
    "signatureHoles": [
      {
        "number": 1,
        "description": "Hål 1 vid poolen med spektakulär start och utsikt över banan."
      }
    ],
    "googlePlaceId": "ChIJjxOV2h7Wcg0RO6U_QwWDNCw",
    "media": {
      "heroImage": "/images/golf/aloha-hero.png",
      "gallery": []
    }
  },
  {
    "id": "bonalba",
    "slug": "bonalba",
    "name": "Bonalba Golf",
    "shortName": "Bonalba Golf",
    "tagline": "Golf med Medelhavets bästa vyer och spännande utmaningar",
    "description": "Bonalba Golf är en par 72-bana i Costa Blanca med 5 sjöar på 7 hål och strategiska bunkrar. Perfekt för alla nivåer med fantastiska vyer.[1]",
    "longDescription": "Bonalba Golf i Costa Blanca, Spanien, är en parklandbana designad av D. Ramón Espinosa. Banan mäter upp till 6096 meter från gula tees och erbjuder en öppen layout omgiven av vegetation och grönområden, skyddad av Sierra de Bonalba med sensationell havsutsikt.[1][3]\n\nMed 5 stora sjöar som påverkar 7 hål och många strategiskt placerade bunkrar ger banan en spännande utmaning för golfare på alla nivåer. Den är platt men undulerad med smala fairways, vilket kräver precision och strategi.[2][4]\n\nUpplevelsen är rolig och varierad, med vacker natur och närhet till Hotel Bonalba Alicante. En perfekt bana för en minnesvärd golfrunda i Medelhavsklimatet.[3][5]",
    "region": "costa-blanca",
    "subRegion": "Mutxamel",
    "province": "Alicante",
    "address": {
      "street": "Carrer del Vespre 6 bis",
      "postalCode": "03110",
      "city": "Mutxamel",
      "country": "ES"
    },
    "coordinates": {
      "lat": 38.4430355,
      "lng": -0.4323317
    },
    "courseInfo": {
      "holes": 18,
      "par": 72,
      "length": {
        "meters": 6096,
        "yards": 6667
      },
      "architect": "D. Ramón Espinosa",
      "openedYear": 2002
    },
    "difficulty": {
      "level": "medium",
      "description": "Medelsvår bana med sjöar på 7 hål, strategiska bunkrar och undulerade fairways som utmanar alla nivåer."
    },
    "pricing": {
      "greenFee": {
        "highSeason": {
          "weekday": {
            "min": 109,
            "max": 109
          },
          "weekend": {
            "min": 109,
            "max": 109
          }
        },
        "lowSeason": {
          "weekday": {
            "min": 77,
            "max": 77
          },
          "weekend": {
            "min": 77,
            "max": 77
          }
        }
      },
      "currency": "EUR",
      "priceSource": "https://golfbonalba.com/en/rates",
      "lastUpdated": "2026-01-21T21:04:48.835Z",
      "extras": {
        "buggy": 25,
        "clubRental": 35,
        "trolley": 5,
        "rangeBalls": 5,
        "rangeBallsIncluded": false,
        "electricTrolley": 12
      },
      "seasonDates": {
        "highSeason": {
          "from": "01-10",
          "to": "31-05"
        },
        "lowSeason": {
          "from": "01-06",
          "to": "30-09"
        }
      }
    },
    "facilities": {
      "course": {
        "drivingRange": true,
        "puttingGreen": true,
        "chippingGreen": true,
        "practiceBunker": true
      },
      "clubhouse": {
        "restaurant": true,
        "proshop": true,
        "locker": true,
        "bar": true,
        "terrace": true,
        "shower": true
      },
      "services": {
        "golfSchool": true,
        "proAvailable": true,
        "clubFitting": false,
        "clubRepair": false,
        "caddie": false
      },
      "other": {
        "spa": true,
        "pool": true,
        "gym": false,
        "tennis": false,
        "padel": false,
        "hotel": true
      }
    },
    "contact": {
      "phone": "+34 965 955 955",
      "email": "info@golfbonalba.com",
      "website": "https://golfbonalba.com/en",
      "phoneInternational": "+34 965 955 955"
    },
    "rating": {
      "overall": 4.2,
      "totalReviews": 1778
    },
    "holes": [],
    "signatureHoles": [
      {
        "number": 1,
        "description": "Första hålet introducerar banans karaktär med sjöar och bunkrar i vacker medelhavsmiljö."
      }
    ],
    "googlePlaceId": "ChIJmXlGR4o6Yg0RrjhxKIV0jhI",
    "media": {
      "heroImage": "/images/golf/bonalba-hero.png",
      "gallery": []
    }
  },
  {
    "id": "cabopino",
    "slug": "cabopino",
    "name": "Cabopino Golf Marbella",
    "shortName": "Cabopino",
    "tagline": "Spektakulär golf med medelhavsvy på Costa del Sol",
    "description": "En 18-håls bana med par 71 belägen mellan Marbella och Mijas Costa. Känd för dramatiska hål med fantastisk medelhavsvy och tallskog.",
    "longDescription": "Cabopino Golf Marbella är en unik golfbana belägen bland höjderna i Marbella med spektakulär utsikt över Medelhavet. Banan, som betyder Tallpromontoriens Golf, erbjuder en perfekt balans mellan utmaning och nöje, lämplig för både erfarna och mindre erfarna golfspelare. Designad av Juan Ligués Creus, följer banan en naturlig topografi med rullande terräng, olivlundar och den omgivande tallskogen.\n\nBanan är känd för sina dramatiska hål, särskilt hålet 3 som är en av de mest spektakulära på Costa del Sol. Denna par 4 har en tee-box på klippkanten med ett höjdskillnad på närmare 80 meter ned till fairwayen, följt av en höjd green skyddad av en stor bunkker. Hålen 13 och 15 erbjuder också attraktiva utmaningar med bäckar och sjöar.\n\nBanan underhålls året runt för att säkerställa optimala förhållanden även under vintern. Med sitt milda klimat, närhet till Málaga flygplats (30 minuter) och ett omfattande utbud av faciliteter gör det detta till en av de bästa golfbanorna på Costa del Sol.",
    "region": "costa-del-sol",
    "subRegion": "Marbella",
    "province": "Málaga",
    "address": {
      "street": "Urbanización Artola Baja s/n",
      "postalCode": "29604",
      "city": "Marbella",
      "country": "ES"
    },
    "coordinates": {
      "lat": 36.4939952,
      "lng": -4.7403275
    },
    "courseInfo": {
      "holes": 18,
      "par": 71,
      "length": {
        "meters": 5170,
        "yards": 5650
      },
      "architect": "Juan Ligués Creus",
      "openedYear": 0
    },
    "difficulty": {
      "level": "medium",
      "description": "En bana med medel svårighet lämplig för alla handicapklasser. De rullande topparna, smala fairways och strategiskt placerade hazard gör det en underhållande utmaning utan att vara överväldigande."
    },
    "pricing": {
      "greenFee": {
        "highSeason": {
          "weekday": {
            "min": 98,
            "max": 98
          },
          "weekend": {
            "min": 98,
            "max": 98
          }
        },
        "lowSeason": {
          "weekday": {
            "min": 62,
            "max": 62
          },
          "weekend": {
            "min": 62,
            "max": 62
          }
        }
      },
      "currency": "EUR",
      "priceSource": "https://www.cabopinogolfmarbella.com/en/rates/",
      "lastUpdated": "2026-01-21T21:04:48.846Z",
      "extras": {
        "buggy": 40,
        "clubRental": 25,
        "trolley": 6,
        "rangeBalls": 5,
        "rangeBallsIncluded": false
      },
      "seasonDates": {
        "highSeason": {
          "from": "01-10",
          "to": "31-05"
        },
        "lowSeason": {
          "from": "01-06",
          "to": "30-09"
        }
      }
    },
    "facilities": {
      "course": {
        "drivingRange": true,
        "puttingGreen": true,
        "chippingGreen": true,
        "practiceBunker": true
      },
      "clubhouse": {
        "restaurant": true,
        "proshop": true,
        "locker": true,
        "bar": true,
        "terrace": true,
        "shower": true
      },
      "services": {
        "golfSchool": true,
        "proAvailable": true,
        "clubFitting": false,
        "clubRepair": false,
        "caddie": false
      },
      "other": {
        "spa": false,
        "pool": false,
        "gym": false,
        "tennis": false,
        "padel": false,
        "hotel": false
      }
    },
    "contact": {
      "phone": "",
      "email": "",
      "website": "cabopinogolfmarbella.com",
      "phoneInternational": ""
    },
    "rating": {
      "overall": 4.3,
      "totalReviews": 835
    },
    "holes": [],
    "signatureHoles": [
      {
        "number": 3,
        "description": "Spektakulär par 4 med tee-box på klippkanten. Nästan 80 meters höjdskillnad ned till fairwayen, följt av en förhöjd green skyddad av stor bunkker. Medelhavsvy gör detta till ett oförglömligt hål."
      },
      {
        "number": 10,
        "description": "Fantastisk utsikt över back nine och Medelhavet från tee-boxen."
      }
    ],
    "googlePlaceId": "ChIJU0Abt2Ygcw0Rrf767Mq844c",
    "media": {
      "heroImage": "/images/golf/cabopino-hero.png",
      "gallery": []
    }
  },
  {
    "id": "campoamor",
    "slug": "campoamor",
    "name": "Real Club de Golf Campoamor",
    "shortName": "Campoamor",
    "tagline": "Kunglig golf i skyddade dalar på Costa Blanca",
    "description": "Real Club de Golf Campoamor är en 18-hålsbana med par 72, 6277 meter lång, invigd 1988 i vild natur mellan dalar omgivna av kullar.[1]",
    "longDescription": "Real Club de Golf Campoamor ligger i den vilda skönheten i Dehesa de Campoamor, uppbyggd mellan två sammanlänkade dalar omgivna av små kullar som skyddar banan från vind och skapar ett mikroklimat för spel året runt. Banan utmanar erfarna spelare med sin varierade layout och höga underhållsstandard, förstärkt av frodig vegetation och rikt djurliv.[1]\n\nMed längd på 6277 meter och par 72 erbjuder banan en klassisk parkbanaupplevelse med utsikt över landskapet. Invigd 1988 av SAR D. Juan de Borbón arrangeras årligen en turnering till hans ära, vilket understryker banans kungliga status och tradition.[1][2]\n\nSvårighetsgraden är medelhög med tekniska hål som kräver precision, perfekt för både lokala spelare och golfresenärer på Costa Blanca.",
    "region": "costa-blanca",
    "subRegion": "Orihuela Costa",
    "province": "Alicante",
    "address": {
      "street": "Avenida Conde de Barcelona 12",
      "postalCode": "03189",
      "city": "Dehesa de Campoamor",
      "country": "ES"
    },
    "coordinates": {
      "lat": 37.9283284,
      "lng": -0.7790005
    },
    "courseInfo": {
      "holes": 18,
      "par": 72,
      "length": {
        "meters": 6277,
        "yards": 6865
      },
      "architect": "Okänd",
      "openedYear": 1988
    },
    "difficulty": {
      "level": "medium",
      "description": "Banan utmanar erfarna spelare med varierad layout i skyddade dalar, medelhård svårighet som kräver precision och strategi."
    },
    "pricing": {
      "greenFee": {
        "highSeason": {
          "weekday": {
            "min": 81,
            "max": 192
          },
          "weekend": {
            "min": 81,
            "max": 192
          }
        },
        "lowSeason": {
          "weekday": {
            "min": 50,
            "max": 170
          },
          "weekend": {
            "min": 50,
            "max": 170
          }
        }
      },
      "currency": "EUR",
      "priceSource": "Multiple sources: 1golf.eu, costalessgolf.com, sunnyalgarvetravel.com, golf-service.com",
      "lastUpdated": "2026-01-21T21:04:48.836Z",
      "extras": {
        "buggy": 35,
        "clubRental": 35,
        "trolley": null,
        "rangeBalls": 5,
        "rangeBallsIncluded": false
      },
      "seasonDates": {
        "highSeason": {
          "from": "01-10",
          "to": "31-05"
        },
        "lowSeason": {
          "from": "01-06",
          "to": "30-09"
        }
      }
    },
    "facilities": {
      "course": {
        "drivingRange": true,
        "puttingGreen": true,
        "chippingGreen": true,
        "practiceBunker": true
      },
      "clubhouse": {
        "restaurant": true,
        "proshop": true,
        "locker": true,
        "bar": true,
        "terrace": true,
        "shower": true
      },
      "services": {
        "golfSchool": true,
        "proAvailable": true,
        "clubFitting": false,
        "clubRepair": false,
        "caddie": false
      },
      "other": {
        "spa": false,
        "pool": false,
        "gym": false,
        "tennis": false,
        "padel": false,
        "hotel": true
      }
    },
    "contact": {
      "phone": "+34 965 32 21 51",
      "email": "info@lomasdecampoamor.es",
      "website": "https://lomasdecampoamor.es/en/golf-club",
      "phoneInternational": "+34 965 32 21 51"
    },
    "rating": {
      "overall": 4.3,
      "totalReviews": 1636
    },
    "holes": [],
    "signatureHoles": [
      {
        "number": 1,
        "description": "Första hålet inleder med utsikt över dalen och kräver rak drive för att undvika bunkrar."
      }
    ],
    "googlePlaceId": "ChIJ28YQIPQIYw0RE5ryByXEh2I",
    "media": {
      "heroImage": "/images/golf/campoamor-hero.png",
      "gallery": []
    }
  },
  {
    "id": "el-plantio",
    "slug": "el-plantio",
    "name": "El Plantio Golf",
    "shortName": "El Plantio",
    "tagline": "Prisvärd parkbana nära Alicante med palmträd och vattenhinder",
    "description": "Välunderhållen 18-hålers parkbana på flackt område kantat av palmer och färgsprakande vegetation, belägen 10 minuter från Alicante flygplats",
    "longDescription": "El Plantio är en väl komponerad parkbana utlagd i ett ganska flackt område med palmer och blomstrande vegetation. Banan ligger i perfekt harmoni med sin omgivning och bjuder på ett spektakulärt naturupplevelse.\n\nBanan presenterar en strategisk design med vattenhinder och placerade bunkrar som erbjuder en viss utmaning utan att vara extremt svår. Banan är lämplig för de flesta golfares nivåer och erbjuder en balanserad upplevelse för både nybörjare och erfarna spelare.\n\nEl Plantio är ett komplett golfresort med moderna lägenhetsbostäder bara 10 minuter från Alicante flygplats. Resorten erbjuder utmärkta faciliteter inklusive restaurang, pro-shop, 24-timmars reception och anslutning till andra fina banor i området som Seve Ballesteros Alicante och Alicante Golf.",
    "region": "costa-blanca",
    "subRegion": "Alicante",
    "province": "Alicante",
    "address": {
      "street": "Antigua Carretera Alicante-Elche, Km 3",
      "postalCode": "03114",
      "city": "Alicante",
      "country": "ES"
    },
    "coordinates": {
      "lat": 38.3096893,
      "lng": -0.5401117
    },
    "courseInfo": {
      "holes": 18,
      "par": 0,
      "length": {
        "meters": 0,
        "yards": 0
      },
      "architect": "",
      "openedYear": 0
    },
    "difficulty": {
      "level": "medium",
      "description": "Flackt terräng med strategiskt placerade vattenhinder och bunkrar som erbjuder måttlig utmaning för golfare på alla nivåer"
    },
    "pricing": {
      "greenFee": {
        "lowSeason": {
          "weekday": {
            "min": 0,
            "max": 0
          },
          "weekend": {
            "min": 0,
            "max": 0
          }
        },
        "highSeason": {
          "weekday": {
            "min": 0,
            "max": 0
          },
          "weekend": {
            "min": 0,
            "max": 0
          }
        }
      },
      "currency": "EUR",
      "seasonDates": {
        "highSeason": {
          "from": "01-10",
          "to": "31-05"
        },
        "lowSeason": {
          "from": "01-06",
          "to": "30-09"
        }
      },
      "lastUpdated": "2026-01-22T01:38:24.965Z",
      "extras": {
        "buggy": 40,
        "clubRental": 30,
        "trolley": 5,
        "rangeBalls": 4,
        "rangeBallsIncluded": false
      }
    },
    "facilities": {
      "course": {
        "drivingRange": true,
        "puttingGreen": true,
        "chippingGreen": false,
        "practiceBunker": true
      },
      "clubhouse": {
        "restaurant": true,
        "proshop": true,
        "locker": true,
        "bar": false,
        "terrace": true,
        "shower": true
      },
      "services": {
        "golfSchool": false,
        "proAvailable": true,
        "clubFitting": false,
        "clubRepair": false,
        "caddie": false
      },
      "other": {
        "spa": false,
        "pool": true,
        "gym": true,
        "tennis": false,
        "padel": false,
        "hotel": true
      }
    },
    "contact": {
      "phone": "",
      "email": "",
      "website": "https://www.elplantio.com/index.php",
      "phoneInternational": ""
    },
    "rating": {
      "overall": 4.2,
      "totalReviews": 1966
    },
    "holes": [],
    "signatureHoles": [],
    "googlePlaceId": "ChIJqR7ihQo1Yg0RMA0-XBghi40",
    "media": {
      "heroImage": "/images/golf/el-plantio-hero.png",
      "gallery": []
    }
  },
  {
    "id": "la-cala",
    "slug": "la-cala",
    "name": "La Cala Golf Resort",
    "shortName": "La Cala",
    "tagline": "Spaniens största golfkomplex med tre mästerskapsbanor på Costa del Sol",
    "description": "La Cala Golf Resort är Spaniens största golfkomplex beläget i Mijas på Costa del Sol, med tre kompletta 18-håls mästerskapsbanor designade av Cabell B. Robinson.",
    "longDescription": "La Cala Golf Resort är en exklusiv golfanläggning och semesterort belägen mellan nationalparken Sierra de Mijas och Medelhavet i Mijas, Costa del Sol. Resorten omfattar tre kompletta 18-håls mästerskapsbanor - Campo América, Asia och Europa - designade av världskända arkitekten Cabell B. Robinson. Varje bana erbjuder distinkta utmaningar, varierade par-värden och spektakulära panoramavyer över Andalusiens landskap och Medelhavet.\n\nResorten är mycket mer än bara en golfanläggning. Den kombinerar världsklass golfupplevelser med lyxigt boende, utmärkt gastronomi och spa-tjänster. La Cala Golf Academy erbjuder träning för alla nivåer med flerspråkiga proffs, en sexhåls par-3 pitch-and-putt-bana, driving range, chipping- och bunkerzoner samt en komplett simulatorsvit. Efter en dag på banan väntar clubbhuset med bar och restaurang som serverar både internationella och lokala rätter.\n\nLäget är idealiskt för resor till Costa del Sol. Resorten ligger omkring 35 minuters bilresa från Málagas internationella flygplats och cirka 15 minuters bilresa från Marbella. De närmaste stränderna ligger bara 10 minuters bilresa bort. Gästerna kan välja mellan elegant boende i rymliga rum med möblerade balkonger och utsikt över golfbanorna, eller investera i nya fastigheter på golfresorten.",
    "region": "costa-del-sol",
    "subRegion": "Mijas",
    "province": "Málaga",
    "address": {
      "street": "Calle Mirador del Golf 1",
      "postalCode": "29649",
      "city": "Mijas",
      "country": "ES"
    },
    "coordinates": {
      "lat": 36.5420229,
      "lng": -4.720009999999999
    },
    "courseInfo": {
      "holes": 18,
      "par": 0,
      "length": {
        "meters": 0,
        "yards": 0
      },
      "architect": "Cabell B. Robinson",
      "openedYear": 0
    },
    "difficulty": {
      "level": "medium",
      "description": "La Cala Golf Resort erbjuder tre mästerskapsbanor med varierande svårighetsgrad. Banorna är designade för att utmana erfarna golfspelare samtidigt som de är tillgängliga för nybörjare och utvecklingsspelare. Alla tre banor - Campo América, Asia och Europa - erbjuder unika spelutmaningar med panoramavyer."
    },
    "pricing": {
      "greenFee": {
        "highSeason": {
          "weekday": {
            "min": 115,
            "max": 126
          },
          "weekend": {
            "min": 115,
            "max": 126
          }
        },
        "lowSeason": {
          "weekday": {
            "min": 70,
            "max": 70
          },
          "weekend": {
            "min": 70,
            "max": 70
          }
        }
      },
      "currency": "EUR",
      "priceSource": "https://www.1golf.eu/club/la-cala-resort/ [1]",
      "lastUpdated": "2026-01-21T21:04:48.847Z",
      "extras": {
        "buggy": 0,
        "clubRental": 0,
        "trolley": 0,
        "rangeBalls": 5,
        "rangeBallsIncluded": false
      },
      "seasonDates": {
        "highSeason": {
          "from": "01-10",
          "to": "31-05"
        },
        "lowSeason": {
          "from": "01-06",
          "to": "30-09"
        }
      }
    },
    "facilities": {
      "course": {
        "drivingRange": true,
        "puttingGreen": true,
        "chippingGreen": true,
        "practiceBunker": true
      },
      "clubhouse": {
        "restaurant": true,
        "proshop": true,
        "locker": true,
        "bar": true,
        "terrace": true,
        "shower": true
      },
      "services": {
        "golfSchool": true,
        "proAvailable": true,
        "clubFitting": false,
        "clubRepair": false,
        "caddie": false
      },
      "other": {
        "spa": true,
        "pool": true,
        "gym": false,
        "tennis": false,
        "padel": false,
        "hotel": true
      }
    },
    "contact": {
      "phone": "0",
      "email": "0",
      "website": "0",
      "phoneInternational": "0"
    },
    "rating": {
      "overall": 4.8,
      "totalReviews": 723
    },
    "holes": [],
    "signatureHoles": [],
    "googlePlaceId": "ChIJefsHTifhcg0RIwL-MuMvVrQ",
    "media": {
      "heroImage": "/images/golf/la-cala-hero.png",
      "gallery": []
    }
  },
  {
    "id": "la-finca",
    "slug": "la-finca",
    "name": "La Finca Golf",
    "shortName": "La Finca",
    "tagline": "Utmanande paradis för golfälskare på Costa Blanca",
    "description": "La Finca Golf är en 18-hålsbana i Algorfa med generösa fairways och spektakulära greener, designad av Pepe Gancedo. Ett av Costa Blancas mest framgångsrika golfresort.[1]",
    "longDescription": "La Finca Golf i Algorfa är en av de mest populära golfbanorna på Costa Blanca, designad av den kända spanska arkitekten Pepe Gancedo. Banan har 18 utmanande hål med generösa fairways och greener som präglas av fritt flödande konturer, vilket skapar en varierad och engagerande layout för spelare på alla nivåer.[1]\n\nLayouten erbjuder spektakulära vyer över omgivande landskap och berg, med hål som integreras perfekt i den naturliga miljön. Banan är känd för sin strategiska design som kräver precision, särskilt på de undulerande greenerna. Ett besök på La Finca ger en premiumupplevelse i ett lugnt och exklusivt område.[1][2]\n\nSvårighetsgraden är medelhög, med utmaningar som passar både nybörjare och erfarna golfare. Resorten erbjuder magnifika faciliteter inklusive klubbhus, spa och hotell, vilket gör det till ett perfekt resmål för golfentusiaster som söker både spel och avkoppling.[1][6]",
    "region": "costa-blanca",
    "subRegion": "Algorfa",
    "province": "Alicante",
    "address": {
      "street": "Avda. Antonio Pedrera Soler",
      "postalCode": "03169",
      "city": "Algorfa",
      "country": "ES"
    },
    "coordinates": {
      "lat": 38.0584935,
      "lng": -0.7972077999999999
    },
    "courseInfo": {
      "holes": 18,
      "par": 72,
      "length": {
        "meters": 6000,
        "yards": 6560
      },
      "architect": "Pepe Gancedo",
      "openedYear": 2006
    },
    "difficulty": {
      "level": "medium",
      "description": "Medelhög svårighet med generösa fairways men utmanande greener och strategisk layout som kräver precision."
    },
    "pricing": {
      "greenFee": {
        "highSeason": {
          "weekday": {
            "min": 140,
            "max": 140
          },
          "weekend": {
            "min": 140,
            "max": 140
          }
        },
        "lowSeason": {
          "weekday": {
            "min": 90,
            "max": 90
          },
          "weekend": {
            "min": 90,
            "max": 90
          }
        }
      },
      "currency": "EUR",
      "priceSource": "https://golf.tgbspain.com/golf-course/la-finca-golf/ and https://inmoinvestments.com/news/4293/costa-blanca-golf-course-green-fees-and-prices/",
      "lastUpdated": "2026-01-21T21:04:48.838Z",
      "extras": {
        "buggy": 46,
        "clubRental": 45,
        "trolley": 9,
        "rangeBalls": 5,
        "rangeBallsIncluded": false
      },
      "seasonDates": {
        "highSeason": {
          "from": "01-10",
          "to": "31-05"
        },
        "lowSeason": {
          "from": "01-06",
          "to": "30-09"
        }
      }
    },
    "facilities": {
      "course": {
        "drivingRange": true,
        "puttingGreen": true,
        "chippingGreen": true,
        "practiceBunker": true
      },
      "clubhouse": {
        "restaurant": true,
        "proshop": true,
        "locker": true,
        "bar": true,
        "terrace": true,
        "shower": true
      },
      "services": {
        "golfSchool": true,
        "proAvailable": true,
        "clubFitting": false,
        "clubRepair": false,
        "caddie": false
      },
      "other": {
        "spa": true,
        "pool": true,
        "gym": true,
        "tennis": true,
        "padel": true,
        "hotel": true
      }
    },
    "contact": {
      "phone": "+34 966 969 066",
      "email": "info@lafincaresort.com",
      "website": "www.lafincaresort.com",
      "phoneInternational": "+34 966 969 066"
    },
    "rating": {
      "overall": 4.6,
      "totalReviews": 303
    },
    "holes": [],
    "signatureHoles": [
      {
        "number": 10,
        "description": "Det ikoniska 10:e hålet passerar precis utanför hotellet och erbjuder dramatisk utsikt med strategiska utmaningar."
      }
    ],
    "googlePlaceId": "ChIJHUvG19ulYw0RgZWBgHce7nM",
    "media": {
      "heroImage": "/images/golf/la-finca-hero.png",
      "gallery": []
    }
  },
  {
    "id": "la-marquesa",
    "slug": "la-marquesa",
    "name": "La Marquesa Golf",
    "shortName": "La Marquesa",
    "tagline": "Ikonisk golf på Costa Blanca med året-runt spel",
    "description": "La Marquesa Golf är en historisk 18-hålsbana i Rojales, Alicante. Par 72 med varierad layout och medelhavsklimat för golf året runt. (112 tecken)",
    "longDescription": "La Marquesa Golf, grundad 1989 av D. Justo Quesada, är en av Costa Blancas mest ikoniska golfbanor. Belägen i Rojales nära Alicante erbjuder den en unik blandning av tradition och modernitet med fantastiska utsikter över havet, bergen och banan själv. Den 18-hålsbanan, par 72, är varierad med backar, blinda hål, bunkrar, vattendrag och två sjöar som utmanar alla clubs i bagen.[1][3][5]\n\nBanans layout testar spelarens precision och strategi, med faciliteter som driving range, restaurang och pro shop för en komplett upplevelse. Det milda klimatet möjliggör spel året runt, perfekt för svenska golfare som söker sol och golf i vintermånaderna. Ett centrum med affärer och barer finns intill.[1][6]\n\nUpplevelsen präglas av naturens skönhet och en känsla av exklusivitet, trots blandade recensioner om banans skick. En riktig pärla för golfentusiaster på Costa Blanca.[2][7]",
    "region": "costa-blanca",
    "subRegion": "Rojales",
    "province": "Alicante",
    "address": {
      "street": "Calle Quesada Ballester 1",
      "postalCode": "03170",
      "city": "Rojals",
      "country": "ES"
    },
    "coordinates": {
      "lat": 38.0846806,
      "lng": -0.7098799
    },
    "courseInfo": {
      "holes": 18,
      "par": 72,
      "length": {
        "meters": 6000,
        "yards": 6560
      },
      "architect": "D. Justo Quesada",
      "openedYear": 1989
    },
    "difficulty": {
      "level": "medium",
      "description": "Medel svåra med backar, blinda hål, bunkrar, bäckar och sjöar som utmanar precision och strategi för alla spelare."
    },
    "pricing": {
      "greenFee": {
        "highSeason": {
          "weekday": {
            "min": 87,
            "max": 87
          },
          "weekend": {
            "min": 87,
            "max": 87
          }
        },
        "lowSeason": {
          "weekday": {
            "min": 80,
            "max": 80
          },
          "weekend": {
            "min": 80,
            "max": 80
          }
        }
      },
      "currency": "EUR",
      "priceSource": "https://www.lamarquesagolf.es/en/golf-rates/",
      "lastUpdated": "2026-01-21T21:04:48.839Z",
      "extras": {
        "buggy": 37,
        "clubRental": 38,
        "trolley": 8,
        "rangeBalls": 5,
        "rangeBallsIncluded": false
      },
      "seasonDates": {
        "highSeason": {
          "from": "01-10",
          "to": "31-05"
        },
        "lowSeason": {
          "from": "01-06",
          "to": "30-09"
        }
      }
    },
    "facilities": {
      "course": {
        "drivingRange": true,
        "puttingGreen": true,
        "chippingGreen": true,
        "practiceBunker": true
      },
      "clubhouse": {
        "restaurant": true,
        "proshop": true,
        "locker": true,
        "bar": true,
        "terrace": true,
        "shower": true
      },
      "services": {
        "golfSchool": true,
        "proAvailable": true,
        "clubFitting": false,
        "clubRepair": false,
        "caddie": false
      },
      "other": {
        "spa": false,
        "pool": false,
        "gym": false,
        "tennis": false,
        "padel": false,
        "hotel": false
      }
    },
    "contact": {
      "phone": "+34 966 711 150",
      "email": "info@lamarquesagolf.es",
      "website": "www.lamarquesagolf.es",
      "phoneInternational": "+34 966 711 150"
    },
    "rating": {
      "overall": 4,
      "totalReviews": 390
    },
    "holes": [],
    "signatureHoles": [
      {
        "number": 17,
        "description": "Hål 17 liknar Sawgrass ikoniska 17:e med vattenhinder som kräver perfekt precision."
      }
    ],
    "googlePlaceId": "ChIJw36ODueuYw0RUdYIxgb2WS8",
    "media": {
      "heroImage": "/images/golf/la-marquesa-hero.png",
      "gallery": []
    }
  },
  {
    "id": "la-quinta",
    "slug": "la-quinta",
    "name": "La Quinta Golf & Country Club",
    "shortName": "La Quinta",
    "tagline": "Golf i Medelhavets hjärta mellan hav och berg",
    "description": "Unik 27-hålsbana i Marbellas Golf Valley, designad av Manuel Piñero. Varierad layout med fantastisk utsikt, lämplig för alla nivåer (max 128 tecken).",
    "longDescription": "La Quinta Golf & Country Club ligger i Marbellas Golf Valley, omgiven av hav och berg i ett område av exceptionell skönhet. Banan består av tre 9-håls slingor (A, B och C) som kan kombineras till varierade 18-hålsrundor, designade av den legendariske spanska golfaren Manuel Piñero. Invigd 1989 erbjuder den en perfekt blandning av utmaning och njutning i ett medelhavsmiljö.\n\nLayouten är varierad med doglegs, vattenhinder, mogna träd och tekniska greener. Fairways är av medelbredd och banan är inte överdrivet lång, vilket ger birdiemöjligheter för den raka slagarens. Den är särskilt lämplig för medel- till höghandicapare, bekväm och spelbar för alla nivåer med pittoreska vyer över bergen och havet.\n\nUpplevelsen präglas av lugn och naturkänsla trots närheten till bebyggelse. Klubben har utmärkt service med restaurang, pro shop och driving range, vilket gör den ideal för både amatörer och proffs.",
    "region": "costa-del-sol",
    "subRegion": "Nueva Andalucía",
    "province": "Málaga",
    "address": {
      "street": "Avenida Tomás Pascual 22",
      "postalCode": "29678",
      "city": "Benahavís",
      "country": "ES"
    },
    "coordinates": {
      "lat": 36.512381,
      "lng": -4.9947731
    },
    "courseInfo": {
      "holes": 27,
      "par": 72,
      "length": {
        "meters": 5500,
        "yards": 6010
      },
      "architect": "Manuel Piñero",
      "openedYear": 1989
    },
    "difficulty": {
      "level": "medium",
      "description": "Bekväm och rolig bana med varierande utmaningar som doglegs och vattenhinder, ideal för medel- till höghandicapare."
    },
    "pricing": {
      "greenFee": {
        "highSeason": {
          "weekday": {
            "min": 103,
            "max": 103
          },
          "weekend": {
            "min": 103,
            "max": 103
          }
        },
        "lowSeason": {
          "weekday": {
            "min": 103,
            "max": 103
          },
          "weekend": {
            "min": 103,
            "max": 103
          }
        }
      },
      "currency": "EUR",
      "priceSource": "https://www.1golf.eu/en/club/la-quinta-golf-country-club/",
      "lastUpdated": "2026-01-21T21:04:48.848Z",
      "extras": {
        "buggy": 24,
        "clubRental": 33,
        "trolley": 4,
        "rangeBalls": 5,
        "rangeBallsIncluded": false
      },
      "seasonDates": {
        "highSeason": {
          "from": "01-10",
          "to": "31-05"
        },
        "lowSeason": {
          "from": "01-06",
          "to": "30-09"
        }
      }
    },
    "facilities": {
      "course": {
        "drivingRange": true,
        "puttingGreen": true,
        "chippingGreen": true,
        "practiceBunker": true
      },
      "clubhouse": {
        "restaurant": true,
        "proshop": true,
        "locker": true,
        "bar": true,
        "terrace": true,
        "shower": true
      },
      "services": {
        "golfSchool": true,
        "proAvailable": true,
        "clubFitting": false,
        "clubRepair": false,
        "caddie": false
      },
      "other": {
        "spa": false,
        "pool": false,
        "gym": false,
        "tennis": false,
        "padel": false,
        "hotel": true
      }
    },
    "contact": {
      "phone": "+34 952 76 20 00",
      "email": "reservations@westinlaquinta.com",
      "website": "www.westinlaquinta.com",
      "phoneInternational": "+34 952 76 20 00"
    },
    "rating": {
      "overall": 4.4,
      "totalReviews": 859
    },
    "holes": [],
    "signatureHoles": [
      {
        "number": 1,
        "description": "Öppningshål med bred fairway och inbjudande layout som sätter tonen för rundan med vacker utsikt."
      }
    ],
    "googlePlaceId": "ChIJGS9jvevVcg0Rcm7DcguECpI",
    "media": {
      "heroImage": "/images/golf/la-quinta-hero.png",
      "gallery": []
    }
  },
  {
    "id": "las-colinas",
    "slug": "las-colinas",
    "name": "Las Colinas Golf & Country Club",
    "shortName": "Las Colinas",
    "tagline": "Spaniens bästa golfupplevelse i en grön dal",
    "description": "Prisbelönt 18-håls mästerskapsbana i vacker dal på Costa Blanca. Varierad layout med breda fairways och kuperade greener. Perfekt för alla nivåer.[1]",
    "longDescription": "Las Colinas Golf & Country Club är en av Spaniens främsta golfbanor, invigd 2010 och belönad flera gånger som bästa golfbana vid World Golf Awards. Banan sträcker sig genom en grönskande dal omgiven av trädbevuxna kullar, med en fantastisk integration av naturen som ger en avskärmad och naturnära upplevelse. Layouten är varierad med breda fairways, kuperade greener och fem olika utslagsplatser, vilket gör den spännande för både amatörer och proffs.[1][3]\n\nDenna par 72-bana erbjuder en utmanande men rättvis spelupplevelse, med signifikanta hål som det avslutande par 5-hålet bevakat av bunkrar och vattenhinder. Arkitekten Caball B. Robinson har skapat en harmonisk kontrast mellan den gröna banan och de vita husen runt omkring. Träningsfaciliteterna är toppklass med driving range på gräs, putting green och närspelsområde designat av Miguel Ángel Jiménez.[1]\n\nUpplevelsen förstärks av resortens lyxiga faciliteter, inklusive klubbhus, restaurang och närhet till strandklubb. Banan passar perfekt för en oförglömlig golfvistelse i Medelhavsklimatet på Costa Blanca.[1][2]",
    "region": "costa-blanca",
    "subRegion": "Dehesa de Campoamor",
    "province": "Alicante",
    "address": {
      "street": "Avenida de las Colinas 2",
      "postalCode": "03189",
      "city": "Dehesa de Campoamor",
      "country": "ES"
    },
    "coordinates": {
      "lat": 37.9279868,
      "lng": -0.8090537999999999
    },
    "courseInfo": {
      "holes": 18,
      "par": 72,
      "length": {
        "meters": 6000,
        "yards": 6560
      },
      "architect": "Caball B. Robinson",
      "openedYear": 2010
    },
    "difficulty": {
      "level": "medium",
      "description": "Medelutmanande med varierad layout, breda fairways och kuperade greener som passar alla nivåer, men kräver precision på bevakade hål."
    },
    "pricing": {
      "greenFee": {
        "highSeason": {
          "weekday": {
            "min": 153,
            "max": 153
          },
          "weekend": {
            "min": 153,
            "max": 153
          }
        },
        "lowSeason": {
          "weekday": {
            "min": 115,
            "max": 115
          },
          "weekend": {
            "min": 115,
            "max": 115
          }
        }
      },
      "currency": "EUR",
      "priceSource": "https://inmoinvestments.com/news/4293/costa-blanca-golf-course-green-fees-and-prices/",
      "lastUpdated": "2026-01-21T21:04:48.840Z",
      "extras": {
        "buggy": 46,
        "clubRental": 0,
        "trolley": 5,
        "rangeBalls": 5,
        "rangeBallsIncluded": false
      },
      "seasonDates": {
        "highSeason": {
          "from": "01-10",
          "to": "31-05"
        },
        "lowSeason": {
          "from": "01-06",
          "to": "30-09"
        }
      }
    },
    "facilities": {
      "course": {
        "drivingRange": true,
        "puttingGreen": true,
        "chippingGreen": true,
        "practiceBunker": true
      },
      "clubhouse": {
        "restaurant": true,
        "proshop": true,
        "locker": true,
        "bar": true,
        "terrace": true,
        "shower": true
      },
      "services": {
        "golfSchool": true,
        "proAvailable": true,
        "clubFitting": false,
        "clubRepair": false,
        "caddie": false
      },
      "other": {
        "spa": true,
        "pool": true,
        "gym": true,
        "tennis": true,
        "padel": true,
        "hotel": false
      }
    },
    "contact": {
      "phone": "+34 966 769 228",
      "email": "info@lascolinasgolf.com",
      "website": "www.lascolinasgolf.com",
      "phoneInternational": "+34 966 769 228"
    },
    "rating": {
      "overall": 4.6,
      "totalReviews": 1906
    },
    "holes": [],
    "signatureHoles": [
      {
        "number": 18,
        "description": "Fantastiskt par 5 med fairway avgränsad av bunkrar och stort vattenhinder, green väl skyddad av vatten och bunkrar."
      }
    ],
    "googlePlaceId": "ChIJey_TTi8GYw0RG4CGIftW5S0",
    "media": {
      "heroImage": "/images/golf/las-colinas-hero.png",
      "gallery": []
    }
  },
  {
    "id": "lauro",
    "slug": "lauro",
    "name": "Lauro Golf",
    "shortName": "Lauro Golf",
    "tagline": "Golf i hjärtat av naturen på Costa del Sol",
    "description": "Lauro Golf är en naturskön 27-hålsbana i orörd miljö vid Mijas-bergen med fantastiska vyer över Guadalhorce-dalen. Tekniskt utmanande men rättvis för alla spelare.",
    "longDescription": "Lauro Golf Resort ligger i en exceptionell naturmiljö på Costa del Sol, omgiven av Mijas-bergen och med panoramautsikt över Guadalhorce-dalen. Banan består av 27 hål som kan spelas i tre olika 18-håls kombinationer, alla med par 72. Designen av den avlidne Folco Nardi och Mariano Benitez fokuserar på respekt för naturen genom att bevara befintliga träd och plantera tusentals nya inhemska arter.[1][2]\n\nBanan är måttligt kuperad med två hål på bergssidan som erbjuder spektakulära vyer över Medelhavet. Den är tekniskt krävande med fokus på kortspel, pitch och putt, men inte överväldigande svår – perfekt för koncentrerad spel med rätt klubbval. Fjorton sjöar och vildliv som kaniner, ankor och örnar skapar en levande upplevelse i mikroklimate skapat av vegetationen.[2][7]\n\nKlubbhuset i den gamla andalusiska byggnaden Cortijo el Paredón erbjuder restaurang, pro shop och utsikt från den vackra innergården med en enorm fikus. En idealisk bana för både tävlingar och avkoppling i harmoni med naturen.[2]",
    "region": "costa-del-sol",
    "subRegion": "Alhaurín de la Torre",
    "province": "Málaga",
    "address": {
      "street": "Ctra. Málaga a Coín A-404",
      "postalCode": "29130",
      "city": "Alhaurín de la Torre",
      "country": "ES"
    },
    "coordinates": {
      "lat": 36.651329,
      "lng": -4.6307769
    },
    "courseInfo": {
      "holes": 27,
      "par": 72,
      "length": {
        "meters": 6000,
        "yards": 6560
      },
      "architect": "Folco Nardi & Mariano Benitez",
      "openedYear": 1999
    },
    "difficulty": {
      "level": "medium",
      "description": "Tekniskt utmanande med fokus på kortspel och precision, men rättvis och inte överväldigande. Måttligt kuperad terräng med sjöar och träd som kräver koncentration."
    },
    "pricing": {
      "greenFee": {
        "highSeason": {
          "weekday": {
            "min": 87.5,
            "max": 99
          },
          "weekend": {
            "min": 96,
            "max": 111
          }
        },
        "midSeason": {
          "weekday": {
            "min": 77.5,
            "max": 86
          },
          "weekend": {
            "min": 82.5,
            "max": 103
          }
        },
        "lowSeason": {
          "weekday": {
            "min": 65,
            "max": 73
          },
          "weekend": {
            "min": 65,
            "max": 73
          }
        }
      },
      "currency": "EUR",
      "priceSource": "https://www.laurogolf.com/en/golf/prices-and-memberships/",
      "lastUpdated": "2026-01-21T21:04:48.850Z",
      "extras": {
        "buggy": 45,
        "clubRental": 30,
        "trolley": 5,
        "rangeBalls": 5,
        "rangeBallsIncluded": false,
        "twilightGreenFee": 55
      },
      "seasonDates": {
        "highSeason": {
          "from": "01-10",
          "to": "31-05"
        },
        "lowSeason": {
          "from": "01-06",
          "to": "30-09"
        }
      }
    },
    "facilities": {
      "course": {
        "drivingRange": true,
        "puttingGreen": true,
        "chippingGreen": true,
        "practiceBunker": true
      },
      "clubhouse": {
        "restaurant": true,
        "proshop": true,
        "locker": true,
        "bar": true,
        "terrace": true,
        "shower": true
      },
      "services": {
        "golfSchool": true,
        "proAvailable": true,
        "clubFitting": false,
        "clubRepair": false,
        "caddie": false
      },
      "other": {
        "spa": false,
        "pool": true,
        "gym": false,
        "tennis": false,
        "padel": true,
        "hotel": false
      }
    },
    "contact": {
      "phone": "+34 952 412 767",
      "email": "info@laurogolf.com",
      "website": "www.laurogolf.com",
      "phoneInternational": "+34 952 412 767"
    },
    "rating": {
      "overall": 4.4,
      "totalReviews": 895
    },
    "holes": [],
    "signatureHoles": [
      {
        "number": 19,
        "description": "Första hålet på bergssidan med spektakulär utsikt över Guadalhorce-dalen och Medelhavet – kräver precision i den kuperade terrängen."
      }
    ],
    "googlePlaceId": "ChIJZ-F8r8vlcg0RoRkJaTO-8KI",
    "media": {
      "heroImage": "/images/golf/lauro-hero.png",
      "gallery": []
    }
  },
  {
    "id": "lo-romero",
    "slug": "lo-romero",
    "name": "Lo Romero Golf",
    "shortName": "Lo Romero",
    "tagline": "Naturens golfparadis vid Medelhavet",
    "description": "18-håls par 72-bana i Pilar de la Horadada med spektakulära vyer över havet och naturlig terräng. Passar alla nivåer.[1]",
    "longDescription": "Lo Romero Golf är en 18-håls par 72-bana som harmoniskt följer den naturliga terrängen i Pilar de la Horadada på Costa Blanca. Omgiven av tallar, inhemsk växtlighet och mjuka kullar sluttande mot Medelhavet, erbjuder banan en perfekt blandning av teknik, skönhet och utmaning. Designen utnyttjar det befintliga landskapet för dramatiska vyer, särskilt mot havet.[1][2]\n\nBanan passar golfare på alla nivåer och utmärks av sitt ikoniska 18:e hål, helt omgivet av vatten, som är en av Costa Blancas mest fotograferade. Med över 300 soldagar per år, milda vintrar och närhet till stränder som Torre de la Horadada, ger Lo Romero en ultimat golfupplevelse i Medelhavsklimat. Klubbhuset med restaurang och utsikt över banan förstärker den sociala aspekten.[1]\n\nLäget nära naturreservat, cykelvägar och flygplatser i Murcia och Alicante gör banan idealisk för både besökare och boende som söker livskvalitet. Här möts golf, natur och avslappning i en dynamisk region.[1]",
    "region": "costa-blanca",
    "subRegion": "Pilar de la Horadada",
    "province": "Alicante",
    "address": {
      "street": "Lo Romero Golf",
      "postalCode": "03190",
      "city": "Pilar de la Horadada",
      "country": "ES"
    },
    "coordinates": {
      "lat": 37.865,
      "lng": -0.775
    },
    "courseInfo": {
      "holes": 18,
      "par": 72,
      "length": {
        "meters": 0,
        "yards": 0
      },
      "architect": "Okänd",
      "openedYear": 2008
    },
    "difficulty": {
      "level": "medium",
      "description": "Banan passar alla nivåer med naturlig terräng, vattenhinder och utmanande layout som kräver precision men inte är extremt svår.[1][6]"
    },
    "pricing": {
      "greenFee": {
        "lowSeason": {
          "weekday": {
            "min": 0,
            "max": 0
          },
          "weekend": {
            "min": 0,
            "max": 0
          }
        },
        "highSeason": {
          "weekday": {
            "min": 0,
            "max": 0
          },
          "weekend": {
            "min": 0,
            "max": 0
          }
        }
      },
      "currency": "EUR",
      "seasonDates": {
        "highSeason": {
          "from": "01-10",
          "to": "31-05"
        },
        "lowSeason": {
          "from": "01-06",
          "to": "30-09"
        }
      },
      "lastUpdated": "2026-01-22T01:38:24.966Z",
      "extras": {
        "buggy": 40,
        "clubRental": 30,
        "trolley": 5,
        "rangeBalls": 4,
        "rangeBallsIncluded": false
      }
    },
    "facilities": {
      "course": {
        "drivingRange": true,
        "puttingGreen": true,
        "chippingGreen": true,
        "practiceBunker": true
      },
      "clubhouse": {
        "restaurant": true,
        "proshop": true,
        "locker": true,
        "bar": true,
        "terrace": true,
        "shower": true
      },
      "services": {
        "golfSchool": true,
        "proAvailable": true,
        "clubFitting": false,
        "clubRepair": false,
        "caddie": false
      },
      "other": {
        "spa": false,
        "pool": false,
        "gym": false,
        "tennis": false,
        "padel": false,
        "hotel": false
      }
    },
    "contact": {
      "phone": "+34 968 039 336",
      "email": "info@loromerogolf.com",
      "website": "www.loromerogolf.com",
      "phoneInternational": "+34 968 039 336"
    },
    "rating": {
      "overall": 4.6,
      "totalReviews": 1591
    },
    "holes": [],
    "signatureHoles": [
      {
        "number": 18,
        "description": "Ikoniskt hål helt omgivet av vatten, en av Costa Blancas mest fotograferade med dramatisk vy mot havet.[1]"
      }
    ],
    "googlePlaceId": "ChIJD_Uf2KsOYw0R6pOGl0f-h0o",
    "media": {
      "heroImage": "/images/golf/lo-romero-hero.png",
      "gallery": []
    }
  },
  {
    "id": "los-naranjos",
    "slug": "los-naranjos",
    "name": "Los Naranjos Golf Club",
    "shortName": "Los Naranjos",
    "tagline": "Klassisk parkbana med medelhavsvyer i Marbella",
    "description": "Los Naranjos är en 18-hålsbana designad av Robert Trent Jones Sr. med breda fairways, snabba greener och strategiska bunkrar. Passar alla nivåer.[1]",
    "longDescription": "Los Naranjos Golf Club, invigd 1977, är en av Spaniens främsta banor på Costa del Sol, belägen nära Marbella med Sierra Blanca som dramatisk bakgrund. Banan designades av legendariske Robert Trent Jones Sr. och erbjuder breda fairways, strategiskt placerade bunkrar och vattenhinder som skapar en utmanande men rättvis layout. De snabba Penn A4-greenerna är stora och kuperade, vilket kräver precision.[1][2]\n\nFrämre nio hålen är öppna med palmkantade fairways, medan baksidan blir tightare omgiven av apelsinplantager, olivlundar och pinjeskogar. Längder varierar från 5131 till 6532 meter beroende på tee, vilket gör banan tillgänglig för alla handicaps. Banan har arrangerat stora evenemang som Marbella Women's Open.[1]\n\nUpplevelsen förstärks av Medelhavsklimatet, fantastiska vyer och en klubbhus med utsikt över banan. Rankad topp 20 på Costa del Sol, perfekt för golfentusiaster som söker kvalitet och skönhet.[2]",
    "region": "costa-del-sol",
    "subRegion": "Nueva Andalucía",
    "province": "Málaga",
    "address": {
      "street": "Plaza de Cibeles S/N",
      "postalCode": "29660",
      "city": "Marbella",
      "country": "ES"
    },
    "coordinates": {
      "lat": 36.5098252,
      "lng": -4.9803127
    },
    "courseInfo": {
      "holes": 18,
      "par": 72,
      "length": {
        "meters": 6532,
        "yards": 7140
      },
      "architect": "Robert Trent Jones Sr.",
      "openedYear": 1977
    },
    "difficulty": {
      "level": "medium",
      "description": "Medel svår med långa hål, snabba kuperade greener och strategiska vattenhinder, men breda fairways gör den spelbar för alla nivåer."
    },
    "pricing": {
      "greenFee": {
        "highSeason": {
          "weekday": {
            "min": 150,
            "max": 161
          },
          "weekend": {
            "min": 150,
            "max": 161
          }
        },
        "lowSeason": {
          "weekday": {
            "min": 121,
            "max": 139
          },
          "weekend": {
            "min": 121,
            "max": 139
          }
        }
      },
      "currency": "EUR",
      "priceSource": "https://losnaranjos.com/en/rates/",
      "lastUpdated": "2026-01-21T21:04:48.851Z",
      "extras": {
        "buggy": 54,
        "clubRental": 49,
        "trolley": 10,
        "rangeBalls": 5,
        "rangeBallsIncluded": false
      },
      "seasonDates": {
        "highSeason": {
          "from": "01-10",
          "to": "31-05"
        },
        "lowSeason": {
          "from": "01-06",
          "to": "30-09"
        }
      }
    },
    "facilities": {
      "course": {
        "drivingRange": true,
        "puttingGreen": true,
        "chippingGreen": true,
        "practiceBunker": true
      },
      "clubhouse": {
        "restaurant": true,
        "proshop": true,
        "locker": true,
        "bar": true,
        "terrace": true,
        "shower": true
      },
      "services": {
        "golfSchool": true,
        "proAvailable": true,
        "clubFitting": false,
        "clubRepair": false,
        "caddie": false
      },
      "other": {
        "spa": false,
        "pool": false,
        "gym": false,
        "tennis": false,
        "padel": false,
        "hotel": false
      }
    },
    "contact": {
      "phone": "+34 952 811 200",
      "email": "info@losnaranjosgolfclub.com",
      "website": "www.losnaranjosgolfclub.com",
      "phoneInternational": "+34 952 811 200"
    },
    "rating": {
      "overall": 4.4,
      "totalReviews": 1228
    },
    "holes": [],
    "signatureHoles": [
      {
        "number": 18,
        "description": "Avslutar med spektakulär utsikt från tee till klubbhuset, omgiven av palmer och medelhavsvyer."
      }
    ],
    "googlePlaceId": "ChIJHxR4V_kpcw0RhDwyB4XGMf8",
    "media": {
      "heroImage": "/images/golf/los-naranjos-hero.png",
      "gallery": []
    }
  },
  {
    "id": "miraflores",
    "slug": "miraflores",
    "name": "Miraflores Golf Club",
    "shortName": "Miraflores",
    "tagline": "Costa del Sols mest sociala golfklubb",
    "description": "En utmanande 18-håls golfbana mellan Fuengirola och Marbella med fantastiska vyer över Costa del Sol och havet.",
    "longDescription": "Miraflores Golf Club ligger beläget mellan Fuengirola och Marbella i hjärtat av Costa del Sol, omgivet av vackra kullar i Calahonda. Banan designades av Falco Nardi och öppnades 1990. Den är känd som \"Costa del Sols mest sociala golfklubb\" och erbjuder en välskött och utmanande upplevelse för golfspelare på alla nivåer.\n\nBanan följer naturliga dalgångar och är flackare än den första anblicken antyder. Med 18 hål presenteras olika utmaningar, inklusive vatten som kommer in i spel på flera hål. Många hål har upphöjda tee-boxar med panoramautsikt över kustklinten och bergsketen. Särskilt svåra hål inkluderar hål 12 (en par 5 på 570 meter med en sjö i mitten av fairwayan), hål 5 och 6 (med vatten på utslaget) och hål 15 (där vatten omger grönt).\n\nKlubbhuset omges av bar och restaurang i en varm och välkomnande miljö. Miraflores Academy Driving Range erbjuder golfundervisning med professionella instruktörer och ligger nära 2:a tee. Banan är öppen 365 dagar om året (under förutsättning av väder) och det rekommenderas att boka tee-tider i förväg.",
    "region": "costa-del-sol",
    "subRegion": "Mijas",
    "province": "Málaga",
    "address": {
      "street": "Calle Severiano Ballesteros De Riviera 8",
      "postalCode": "29649",
      "city": "Mijas",
      "country": "ES"
    },
    "coordinates": {
      "lat": 36.5,
      "lng": -4.65
    },
    "courseInfo": {
      "holes": 18,
      "par": 71,
      "length": {
        "meters": 5148,
        "yards": 5625
      },
      "architect": "Falco Nardi",
      "openedYear": 1990
    },
    "difficulty": {
      "level": "medium",
      "description": "En utmanande men rättvis bana för alla spelarnivåer. Breda fairways och stora upphöjda gröna gör den tillgänglig, men vatten i spel på flera hål och naturlig terräng erbjuder en solid utmaning för medelspelaren."
    },
    "pricing": {
      "greenFee": {
        "highSeason": {
          "weekday": {
            "min": 68,
            "max": 68
          },
          "weekend": {
            "min": 68,
            "max": 68
          }
        },
        "lowSeason": {
          "weekday": {
            "min": 68,
            "max": 68
          },
          "weekend": {
            "min": 68,
            "max": 68
          }
        }
      },
      "currency": "EUR",
      "averageGreenFee": 70,
      "priceSource": "https://www.1golf.eu/en/club/miraflores-golf-club/",
      "lastUpdated": "2026-01-21T21:04:48.853Z",
      "extras": {
        "buggy": 0,
        "clubRental": 0,
        "trolley": 0,
        "rangeBalls": 5,
        "rangeBallsIncluded": false
      },
      "seasonDates": {
        "highSeason": {
          "from": "01-10",
          "to": "31-05"
        },
        "lowSeason": {
          "from": "01-06",
          "to": "30-09"
        }
      }
    },
    "facilities": {
      "course": {
        "drivingRange": true,
        "puttingGreen": true,
        "chippingGreen": true,
        "practiceBunker": true
      },
      "clubhouse": {
        "restaurant": true,
        "proshop": true,
        "locker": true,
        "bar": true,
        "terrace": true,
        "shower": true
      },
      "services": {
        "golfSchool": true,
        "proAvailable": true,
        "clubFitting": false,
        "clubRepair": false,
        "caddie": false
      },
      "other": {
        "spa": true,
        "pool": false,
        "gym": true,
        "tennis": false,
        "padel": false,
        "hotel": false
      }
    },
    "contact": {
      "phone": "",
      "email": "",
      "website": "www.mirafloresgolf.es",
      "phoneInternational": ""
    },
    "rating": {
      "overall": 4.3,
      "totalReviews": 770
    },
    "hours": {
      "monday": "08:00-20:00",
      "tuesday": "08:00-20:00",
      "wednesday": "08:00-20:00",
      "thursday": "08:00-20:00",
      "friday": "08:00-20:00",
      "saturday": "08:00-20:00",
      "sunday": "08:00-20:00"
    },
    "signatureHoles": [
      {
        "number": 12,
        "par": 5,
        "length": 570,
        "description": "En utmanande par 5 där en sjö i mitten av fairwayan gör andrslaget komplext."
      },
      {
        "number": 15,
        "description": "Vatten omger grönt, vilket gör detta hål särskilt utmanande."
      }
    ],
    "googlePlaceId": "ChIJlVPJysMfcw0RpjQXrfJ9doE",
    "media": {
      "heroImage": "/images/golf/miraflores-hero.png",
      "gallery": []
    }
  },
  {
    "id": "santa-clara",
    "slug": "santa-clara",
    "name": "Santa Clara Golf Marbella",
    "shortName": "Santa Clara",
    "tagline": "En utmanande golfbana med spektakulär utsikt över Medelhavet",
    "description": "18-håls golfbana designad av Enrique Canales Busquets, belägen några minuter från Marbella centrum med utmanande layout och strategiska krav.",
    "longDescription": "Santa Clara Golf Marbella är en av Costa del Sols mest ikoniska golfbanor, belägen på en 150 hektar stor komplex med spektakulär utsikt över Medelhavet. Banan är designad av Enrique Canales Busquets och ligger bara några minuter från Marbella centrum, vilket gör den lätt tillgänglig för gäster.\n\nBanan är känd för sin utmanande layout som testar golfare på alla nivåer. Med strategisk bunkerplacering, smala landningsområden och undulerade gröna kräver kursen både precision och smart spelstrategi. Den berömda \"Santa Clara Corner\" består av hålen 12, 13 och 14, vilka kräver långa och korrekta slag. Hålen är utformade med både höjdskillnader och doglegs som belönar kreativitet men straffar slarviga slag.\n\nBanan passar både nybörjare och erfarna golfare. För nya spelare erbjuder de första nio hålen ett bra introduktionskurs med bredare fairways, medan erfarna golfare finner en drömkurs som ständigt utmanar med smart spelkrav. Restaurangen håller hygglig standard och klubbhuset är väl utformat.",
    "region": "costa-del-sol",
    "subRegion": "Marbella",
    "province": "Málaga",
    "address": {
      "street": "Calle Sand, Carr. de Cadiz, 17, Km 187,5",
      "postalCode": "29603",
      "city": "Marbella",
      "country": "ES"
    },
    "coordinates": {
      "lat": 36.50839,
      "lng": -4.81654
    },
    "courseInfo": {
      "holes": 18,
      "par": 71,
      "length": {
        "meters": 0,
        "yards": 0
      },
      "architect": "Enrique Canales Busquets",
      "openedYear": 0
    },
    "difficulty": {
      "level": "medium-hard",
      "description": "Utmanande bana som kräver strategi, precision och god beslutskraft. Strategisk bunkerplacering, smala landningsområden och undulerade gröna testar golfare på alla nivåer. Banan belönar smart spelstrategi men straffar slarviga slag."
    },
    "pricing": {
      "greenFee": {
        "lowSeason": {
          "weekday": {
            "min": 0,
            "max": 0
          },
          "weekend": {
            "min": 0,
            "max": 0
          }
        },
        "highSeason": {
          "weekday": {
            "min": 0,
            "max": 0
          },
          "weekend": {
            "min": 0,
            "max": 0
          }
        }
      },
      "currency": "EUR",
      "seasonDates": {
        "highSeason": {
          "from": "01-10",
          "to": "31-05"
        },
        "lowSeason": {
          "from": "01-06",
          "to": "30-09"
        }
      },
      "lastUpdated": "2026-01-22T01:38:24.966Z",
      "extras": {
        "buggy": 40,
        "clubRental": 30,
        "trolley": 5,
        "rangeBalls": 4,
        "rangeBallsIncluded": false
      }
    },
    "facilities": {
      "course": {
        "drivingRange": true,
        "puttingGreen": true,
        "chippingGreen": false,
        "practiceBunker": false
      },
      "clubhouse": {
        "restaurant": true,
        "proshop": true,
        "locker": false,
        "bar": false,
        "terrace": false,
        "shower": false
      },
      "services": {
        "golfSchool": false,
        "proAvailable": false,
        "clubFitting": false,
        "clubRepair": false,
        "caddie": false
      },
      "other": {
        "spa": false,
        "pool": false,
        "gym": false,
        "tennis": false,
        "padel": false,
        "hotel": false
      }
    },
    "contact": {
      "phone": "+34 952 850 111",
      "email": "",
      "website": "santaclaragolfmarbella.com",
      "phoneInternational": "+34 952 850 111"
    },
    "rating": {
      "overall": 4.4,
      "totalReviews": 1020
    },
    "holes": [],
    "signatureHoles": [
      {
        "number": 12,
        "description": "Första hålet i den berömda \"Santa Clara Corner\" som kräver långa och korrekta slag"
      },
      {
        "number": 13,
        "description": "Del av \"Santa Clara Corner\" som testar golfares precision och strategi"
      },
      {
        "number": 14,
        "description": "Sista hålet i den berömda \"Santa Clara Corner\" med utmaningar för höga handicapspelare"
      },
      {
        "number": 15,
        "description": "Hålet med knepig approach som testar tålamod och beslutsfattande"
      },
      {
        "number": 9,
        "description": "Par-5 hålet där klubbval och fairwayplacering är avgörande"
      }
    ],
    "googlePlaceId": "ChIJZS2T7lgncw0RJwPXESIws8M",
    "media": {
      "heroImage": "/images/golf/santa-clara-hero.png",
      "gallery": []
    }
  },
  {
    "id": "torrequebrada",
    "slug": "torrequebrada",
    "name": "Torrequebrada Golf",
    "shortName": "Torrequebrada",
    "tagline": "Golfparadis vid Medelhavet med bergs- och havsutsikt",
    "description": "Golf Torrequebrada i Benalmádena erbjuder 18 hål med fantastisk utsikt över hav och berg. Ett paradis för golfälskare nära Málaga.",
    "longDescription": "Golf Torrequebrada är en av Spaniens mest populära banor, belägen i hjärtat av Costa del Sol i Benalmádena, bara ett stenkast från Medelhavet. Banan invigdes 1976 och är känd för sin natursköna layout med dramatiska utsikter över både bergen och havet, vilket skapar en oförglömlig spelupplevelse för alla golfentusiaster.[1][3]\n\nDe 18 hålen präglas av varierad terräng med välplacerade bunkrar och greener som kräver precision. Banan passar både nybörjare och erfarna spelare tack vare sin medelhöga svårighet och utmärkta träningsfaciliteter som driving range och putting greens. Klubbhuset välkomnar med restaurang och pro shop.[2][3]\n\nSpela här och njut av en perfekt kombination av utmanande golf och Medelhavets skönhet, bara 20 minuter från Málaga flygplats.",
    "region": "costa-del-sol",
    "subRegion": "Benalmádena",
    "province": "Málaga",
    "address": {
      "street": "Calle Club de Golf 1",
      "postalCode": "29630",
      "city": "Benalmádena",
      "country": "ES"
    },
    "coordinates": {
      "lat": 36.588600199999995,
      "lng": -4.551770299999999
    },
    "courseInfo": {
      "holes": 18,
      "par": 72,
      "length": {
        "meters": 6000,
        "yards": 6560
      },
      "architect": "Robert Trent Jones Sr.",
      "openedYear": 1976
    },
    "difficulty": {
      "level": "medium",
      "description": "Medelhård bana med varierad terräng, bunkrar och vackra utsikter som kräver precision men passar de flesta spelare."
    },
    "pricing": {
      "greenFee": {
        "lowSeason": {
          "weekday": {
            "min": 0,
            "max": 0
          },
          "weekend": {
            "min": 0,
            "max": 0
          }
        },
        "highSeason": {
          "weekday": {
            "min": 0,
            "max": 0
          },
          "weekend": {
            "min": 0,
            "max": 0
          }
        }
      },
      "currency": "EUR",
      "seasonDates": {
        "highSeason": {
          "from": "01-10",
          "to": "31-05"
        },
        "lowSeason": {
          "from": "01-06",
          "to": "30-09"
        }
      },
      "lastUpdated": "2026-01-22T01:38:24.967Z",
      "extras": {
        "buggy": 40,
        "clubRental": 30,
        "trolley": 5,
        "rangeBalls": 4,
        "rangeBallsIncluded": false
      }
    },
    "facilities": {
      "course": {
        "drivingRange": true,
        "puttingGreen": true,
        "chippingGreen": true,
        "practiceBunker": true
      },
      "clubhouse": {
        "restaurant": true,
        "proshop": true,
        "locker": true,
        "bar": true,
        "terrace": true,
        "shower": true
      },
      "services": {
        "golfSchool": true,
        "proAvailable": true,
        "clubFitting": false,
        "clubRepair": false,
        "caddie": false
      },
      "other": {
        "spa": false,
        "pool": false,
        "gym": false,
        "tennis": false,
        "padel": false,
        "hotel": false
      }
    },
    "contact": {
      "phone": "+34 952 669 206",
      "email": "info@golftorrequebrada.com",
      "website": "golftorrequebrada.com",
      "phoneInternational": "+34 952 669 206"
    },
    "rating": {
      "overall": 4.4,
      "totalReviews": 1674
    },
    "holes": [],
    "signatureHoles": [
      {
        "number": 1,
        "description": "Första hålet ger en vacker välkomst med utsikt över havet och kräver en rak drive för att undvika bunkrar."
      }
    ],
    "googlePlaceId": "ChIJ9VqWQrj8cg0RSCYhimXMrPY",
    "media": {
      "heroImage": "/images/golf/torrequebrada-hero.png",
      "gallery": []
    }
  },
  {
    "id": "valderrama",
    "slug": "valderrama",
    "name": "Real Club Valderrama",
    "shortName": "Valderrama",
    "tagline": "Europas finaste parklandbana och ett golfhistoriskt mästerverk",
    "description": "Real Club Valderrama är Europas ledande golfbana, designad av Robert Trent Jones Sr. Belägen i Sotogrande på Costa del Sol, väl känd för sitt imponerande greenfee och exklusiva medlemskap.",
    "longDescription": "Real Club Valderrama är en privat golfklubb som anses vara kontinentaleuropas finaste golfbana. Banan, designad av legendariska Robert Trent Jones Sr., ligger vackert inbäddad i höglandet på Costa del Sols fokuserade parklandskap. Från starten som en anonym bana kallad \"Sotogrande New\" har den transformerats till en världskänd destination under ledning av den golfengagerade ägaren James Ortiz-Patino.\n\nBanan är ett strikt test även för erfarna golfspelare. Med snäva fairways omgivna av korkträd och olivträd, nästan 100 bunkrar, upphöjda gröna skyddade av träd och många vattenhinder erfordras precision och noggrann banhantering. De första nio hålen är relativt snävare, medan tillbakasidan erbjuder mer varierad terräng med utsikt över Medelhavet.\n\nValderrama har varit värd för några av golfens största turneringar, inklusive Ryder Cup 1997, Volvo Masters (16 gånger mellan 1988-2008) och World Golf Championships. Klubben erbjuder begränsad allmän spel mellan klockan 12-14 och är klassificerad som nummer 1 i Europa och Spanien.",
    "region": "costa-del-sol",
    "subRegion": "Sotogrande",
    "province": "Andalusien",
    "address": {
      "street": "Avenida los Cortijos s/n",
      "postalCode": "11310",
      "city": "Sotogrande",
      "country": "ES"
    },
    "coordinates": {
      "lat": 36.283086399999995,
      "lng": -5.3273717
    },
    "courseInfo": {
      "holes": 18,
      "par": 72,
      "length": {
        "meters": 6226,
        "yards": 6800
      },
      "architect": "Robert Trent Jones Sr.",
      "openedYear": 1975
    },
    "difficulty": {
      "level": "hard",
      "description": "Mycket svår bana som är ett strikt test även för proffs. Snäva fairways omgivna av korkträd och olivträd, nästan 100 bunkrar, upphöjda gröna och många vattenhinder gör denna bana till en av Europas mest utmanande."
    },
    "pricing": {
      "greenFee": {
        "highSeason": {
          "weekday": {
            "min": 600,
            "max": 600
          },
          "weekend": {
            "min": 0,
            "max": 0
          }
        },
        "lowSeason": {
          "weekday": {
            "min": 0,
            "max": 0
          },
          "weekend": {
            "min": 0,
            "max": 0
          }
        }
      },
      "currency": "EUR",
      "priceSource": "https://www.valderrama.com/golf-course-rates/ och https://www.costalessgolf.com/golf-course/valderrama-golf/",
      "lastUpdated": "2026-01-21T21:04:48.854Z",
      "extras": {
        "buggy": 60,
        "clubRental": 50,
        "trolley": 25,
        "rangeBalls": 5,
        "rangeBallsIncluded": false
      },
      "seasonDates": {
        "highSeason": {
          "from": "01-10",
          "to": "31-05"
        },
        "lowSeason": {
          "from": "01-06",
          "to": "30-09"
        }
      }
    },
    "facilities": {
      "course": {
        "drivingRange": true,
        "puttingGreen": true,
        "chippingGreen": true,
        "practiceBunker": true
      },
      "clubhouse": {
        "restaurant": true,
        "proshop": true,
        "locker": true,
        "bar": true,
        "terrace": true,
        "shower": true
      },
      "services": {
        "golfSchool": true,
        "proAvailable": true,
        "clubFitting": false,
        "clubRepair": false,
        "caddie": false
      },
      "other": {
        "spa": true,
        "pool": false,
        "gym": false,
        "tennis": false,
        "padel": false,
        "hotel": true
      }
    },
    "contact": {
      "phone": "+34 956 613 061",
      "email": "",
      "website": "www.valderrama.com",
      "phoneInternational": "+34 956 613 061"
    },
    "rating": {
      "overall": 4.6,
      "totalReviews": 688
    },
    "holes": [],
    "signatureHoles": [
      {
        "number": 4,
        "description": "Par 5 'La Cascada'. Robert Trent Jones Sr:s favoritthål på banan. Ett mästerverk med höjdförändring och konstant skugga som skyddar det lilla grön."
      },
      {
        "number": 17,
        "description": "Par 5 på 515 yards med vatten framför grön. Kan nås på två slag men är mycket utmanande. Omdesignad av Seve Ballesteros inför Ryder Cup 1997."
      }
    ],
    "googlePlaceId": "ChIJv3KiCOTEDA0Rm-c28nBq-qI",
    "media": {
      "heroImage": "/images/golf/valderrama-hero.png",
      "gallery": []
    }
  },
  {
    "id": "villamartin",
    "slug": "villamartin",
    "name": "Villamartin Golf",
    "shortName": "Villamartin",
    "tagline": "Prestigefylld golfbana i Orihuela Costa med Medelhavsvyer",
    "description": "Villamartin Golf är en klassisk 18-hålsbana i Orihuela Costa, känd för sin vackra parklandlayout, utmanande hål och frodig vegetation. Perfekt för golfare på alla nivåer.[1][5]",
    "longDescription": "Villamartin Golf, designad av Paul Putman och invigd 1972, är en av Costa Blancas mest prestigefyllda banor. Den 18-håls parklandbanan sträcker sig över 6277 meter med par 72 och erbjuder en blandning av öppna fairways och strategiska utmaningar omgivna av frodig medelhavsvegetation, sjöar och palmer. Banan har värd för internationella turneringar som European Tour 1994.[1][2][5]\n\nLayouten präglas av stora greener, vattenhinder och varierande hål som passar både nybörjare och proffs. De mogna träden och fantastiska vyerna över Medelhavet skapar en unik spelupplevelse. Klubbhuset är modernt med utmärkta faciliteter för avkoppling efter rundan.[1][3]\n\nSvårighetsgraden är medelhög med förlåtande sektioner för högre handikappare men tillräcklig variation för att engagera erfarna spelare. Ett måste för golfentusiaster i Orihuela Costa.[3]",
    "region": "costa-blanca",
    "subRegion": "Orihuela Costa",
    "province": "Alicante",
    "address": {
      "street": "Avenida de las Brisas 8",
      "postalCode": "03189",
      "city": "Villamartín",
      "country": "ES"
    },
    "coordinates": {
      "lat": 37.9413714,
      "lng": -0.7582728
    },
    "courseInfo": {
      "holes": 18,
      "par": 72,
      "length": {
        "meters": 6277,
        "yards": 6865
      },
      "architect": "Paul Putman",
      "openedYear": 1972
    },
    "difficulty": {
      "level": "medium",
      "description": "Medelhög svårighet med stora greener, vattenhinder och variation som utmanar alla nivåer, från nybörjare till proffs."
    },
    "pricing": {
      "greenFee": {
        "highSeason": {
          "weekday": {
            "min": 105,
            "max": 105
          },
          "weekend": {
            "min": 105,
            "max": 105
          }
        },
        "lowSeason": {
          "weekday": {
            "min": 80,
            "max": 80
          },
          "weekend": {
            "min": 80,
            "max": 80
          }
        }
      },
      "currency": "EUR",
      "priceSource": "https://inmoinvestments.com/de/nachrichten/4293/greenfees-und-preise-des-golfplatzes-costa-blanca/[2]",
      "lastUpdated": "2026-01-21T21:04:48.842Z",
      "extras": {
        "buggy": 40,
        "clubRental": 40,
        "trolley": 6,
        "rangeBalls": 5,
        "rangeBallsIncluded": false
      },
      "seasonDates": {
        "highSeason": {
          "from": "01-10",
          "to": "31-05"
        },
        "lowSeason": {
          "from": "01-06",
          "to": "30-09"
        }
      }
    },
    "facilities": {
      "course": {
        "drivingRange": true,
        "puttingGreen": true,
        "chippingGreen": true,
        "practiceBunker": true
      },
      "clubhouse": {
        "restaurant": true,
        "proshop": true,
        "locker": true,
        "bar": true,
        "terrace": true,
        "shower": true
      },
      "services": {
        "golfSchool": true,
        "proAvailable": true,
        "clubFitting": false,
        "clubRepair": false,
        "caddie": false
      },
      "other": {
        "spa": false,
        "pool": false,
        "gym": false,
        "tennis": false,
        "padel": false,
        "hotel": false
      }
    },
    "contact": {
      "phone": "+34 96 672 90 10",
      "email": "info@villamartingolfclub.com",
      "website": "https://www.villamartingolfclub.com/home",
      "phoneInternational": "+34 96 672 90 10"
    },
    "rating": {
      "overall": 4.2,
      "totalReviews": 737
    },
    "holes": [],
    "signatureHoles": [
      {
        "number": 1,
        "description": "Första hålet introducerar banans karaktär med fairway omgiven av palmer och sjö, som sätter tonen för rundan."
      }
    ],
    "googlePlaceId": "ChIJuR943O2oYw0R6IBI8YT5vJA",
    "media": {
      "heroImage": "/images/golf/villamartin-hero.png",
      "gallery": []
    }
  },
  {
    "id": "vistabella",
    "slug": "vistabella",
    "name": "Vistabella Golf",
    "shortName": "Vistabella",
    "tagline": "Championship-standard golfbana på Costa Blanca",
    "description": "Vistabella Golf är en prémiergolfbana nära Torrevieja på Costa Blanca med championship-layout, böljande greener och utmanande design.",
    "longDescription": "Vistabella Golf är en prémiergolfbana belägen i lugn naturmiljö mellan San Miguel de Salinas och Los Montesinos på Costa Blanca. Banan har en championship-standard layout som respekteras även av låghandikappare och är utformad för att passa alla spelarnivåer. Banans böljande greener är enorma och rullande, medan fairways är väl underhållna med bermudagräs i det grova som presenterar en betydande utmaning.\n\nBanan kännetecknas av ett löjligt högt antal greensidebunkrar och kräver respekt från alla spelare. En normal rond för en fyrsparkoll tar mellan 4 timmar 20 minuter och 5 timmar. Webbplatsen erbjuder flera barer, restauranger och en butik, samt en gastropub med engelsk frukost och levande underhållning på kvällar.",
    "region": "costa-blanca",
    "subRegion": "Orihuela",
    "province": "Alicante",
    "address": {
      "street": "Avenida del Golf 447",
      "postalCode": "03319",
      "city": "Orihuela",
      "country": "ES"
    },
    "coordinates": {
      "lat": 38.0381682,
      "lng": -0.8236597999999999
    },
    "courseInfo": {
      "holes": 18,
      "par": 0,
      "length": {
        "meters": 0,
        "yards": 0
      },
      "architect": "",
      "openedYear": 0
    },
    "difficulty": {
      "level": "medium-hard",
      "description": "Championship-standard bana med utmanande layout och många greensidebunkrar. Kräver respekt även från låghandikappare. Böljande greener och bermudagräs gör spelet tekniskt krävande."
    },
    "pricing": {
      "greenFee": {
        "highSeason": {
          "weekday": {
            "min": 75,
            "max": 75
          },
          "weekend": {
            "min": 75,
            "max": 75
          }
        },
        "lowSeason": {
          "weekday": {
            "min": 75,
            "max": 75
          },
          "weekend": {
            "min": 75,
            "max": 75
          }
        }
      },
      "currency": "EUR",
      "priceSource": "https://vistabellagolf.com/en/golf-course-price-golf/ (official site)",
      "lastUpdated": "2026-01-21T21:04:48.844Z",
      "extras": {
        "buggy": 0,
        "clubRental": 0,
        "trolley": 0,
        "rangeBalls": 5,
        "rangeBallsIncluded": false
      },
      "seasonDates": {
        "highSeason": {
          "from": "01-10",
          "to": "31-05"
        },
        "lowSeason": {
          "from": "01-06",
          "to": "30-09"
        }
      }
    },
    "facilities": {
      "course": {
        "drivingRange": true,
        "puttingGreen": true,
        "chippingGreen": true,
        "practiceBunker": true
      },
      "clubhouse": {
        "restaurant": true,
        "proshop": true,
        "locker": false,
        "bar": true,
        "terrace": true,
        "shower": false
      },
      "services": {
        "golfSchool": true,
        "proAvailable": true,
        "clubFitting": false,
        "clubRepair": false,
        "caddie": false
      },
      "other": {
        "spa": false,
        "pool": false,
        "gym": false,
        "tennis": false,
        "padel": true,
        "hotel": false
      }
    },
    "contact": {
      "phone": "",
      "email": "",
      "website": "vistabellagolf.com",
      "phoneInternational": ""
    },
    "rating": {
      "overall": 4.4,
      "totalReviews": 386
    },
    "holes": [],
    "signatureHoles": [],
    "googlePlaceId": "ChIJq2BE78mmYw0RI69NNrK9IXU",
    "media": {
      "heroImage": "/images/golf/vistabella-hero.png",
      "gallery": []
    }
  }
];
