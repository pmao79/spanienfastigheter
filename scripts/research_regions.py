import os
import json
import sys
import time
import requests
from dotenv import load_dotenv

load_dotenv('.env.local')

API_KEY = os.getenv('PERPLEXITY_API_KEY')
if not API_KEY:
    print('Error: PERPLEXITY_API_KEY not found in .env.local')
    sys.exit(1)

API_URL = 'https://api.perplexity.ai/chat/completions'


def research_region(region_name: str, region_slug: str) -> dict | None:
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }

    research_prompt = f"""
Jag behöver detaljerad, faktabaserad information om {region_name} i Spanien för en svensk fastighetssajt.
Ge mig information på SVENSKA om:

1. ÖVERSIKT
- Geografisk beskrivning (var ligger regionen, hur lång kustlinje, etc.)
- Vad betyder namnet och varför kallas den så?
- Vilka provinser/städer ingår?

2. KLIMAT OCH VÄDER
- Antal soldagar per år (specifika siffror)
- Medeltemperatur sommar/vinter
- Nederbörd
- Bästa tid att besöka

3. VARFÖR SVENSKAR VÄLJER {region_name.upper()}
- Hur stor är den skandinaviska befolkningen?
- Varför är regionen populär bland svenskar?
- Svenska föreningar, kyrkor, klubbar i området

4. FASTIGHETSMARKNADEN
- Prisintervall för lägenheter (€)
- Prisintervall för villor (€)
- Prisutveckling senaste åren
- Populäraste områdena för utländska köpare

5. INFRASTRUKTUR OCH TRANSPORT
- Närmaste flygplatser och avstånd
- Direktflyg från Sverige (vilka städer, flygbolag)
- Restid från Stockholm/Göteborg/Malmö
- Vägnät, motorvägar, kollektivtrafik

6. LIVSSTIL OCH FACILITETER
- Golfbanor (antal, kända banor)
- Stränder (kända stränder, blå flagg)
- Sjukvård (sjukhus med internationell personal)
- Internationella skolor
- Shopping och restauranger

7. POPULÄRA OMRÅDEN I REGIONEN
- Lista de 5-8 mest populära städerna/områdena för bostadsköp
- Kort beskrivning av varje (1-2 meningar)
- Vad som gör dem unika

8. FÖRDELAR OCH NACKDELAR
- 3-5 fördelar med att köpa bostad här
- 2-3 potentiella nackdelar eller saker att tänka på

9. PRAKTISK INFO
- Tidszon
- Språk (engelskkunskaper hos lokalbefolkningen)
- Levnadskostnader jämfört med Sverige

Ge mig FAKTABASERAD information med specifika siffror där det är möjligt.
Undvik generiska påståenden - var specifik och konkret.
All information ska vara på svenska.
"""

    payload = {
        'model': 'sonar-pro',
        'messages': [
            {
                'role': 'system',
                'content': 'Du är en expert på spanska fastighetsmarknaden och regioner. '
                           'Du ger detaljerad, faktabaserad information på svenska. '
                           'Inkludera specifika siffror och data där möjligt.'
            },
            {
                'role': 'user',
                'content': research_prompt
            }
        ],
        'temperature': 0.2,
        'max_tokens': 4000,
        'return_citations': True
    }

    response = requests.post(API_URL, headers=headers, json=payload, timeout=60)

    if response.status_code == 200:
        result = response.json()
        content = result['choices'][0]['message']['content']

        return {
            'region': region_name,
            'slug': region_slug,
            'research': content,
            'sources': result.get('citations', [])
        }

    print(f'Error: {response.status_code}')
    print(response.text)
    return None


def research_all_regions():
    regions = [
        {'name': 'Costa Blanca', 'slug': 'costa-blanca'},
        {'name': 'Costa del Sol', 'slug': 'costa-del-sol'},
        {'name': 'Costa Cálida', 'slug': 'costa-calida'},
        {'name': 'Costa de Almería', 'slug': 'costa-almeria'}
    ]

    results = []

    for region in regions:
        print(f"Researching {region['name']}...")
        result = research_region(region['name'], region['slug'])
        if result:
            results.append(result)
            print(f"OK: {region['name']} complete")
        else:
            print(f"FAIL: {region['name']} failed")

        time.sleep(2)

    output_path = os.path.join('data', 'region-research.json')
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print(f"\nResearch complete! Saved to {output_path}")
    return results


if __name__ == '__main__':
    research_all_regions()
