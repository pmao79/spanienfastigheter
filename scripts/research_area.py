import os
import requests
import json
import sys
import argparse
import time
from dotenv import load_dotenv

# Load environment variables
load_dotenv('.env.local')

API_KEY = os.getenv('PERPLEXITY_API_KEY')
if not API_KEY:
    print("Error: PERPLEXITY_API_KEY not found in .env.local")
    sys.exit(1)

def search_api(query, system_prompt=None, max_tokens=4000):
    """Query Perplexity API with custom system prompt and higher token limit"""
    url = "https://api.perplexity.ai/chat/completions"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
    default_system = """You are an expert real estate researcher specializing in Spanish coastal properties for Scandinavian buyers.
    
IMPORTANT: Provide COMPREHENSIVE, DETAILED answers with:
- Specific numbers, statistics, and percentages
- Current 2024/2025 data when available
- Price ranges in euros (€)
- Distances in kilometers
- Climate data with temperatures in Celsius
- Population figures
- Historical context where relevant

Always structure your response with clear sections and bullet points.
Include specific neighborhood names, street names, and local landmarks.
Reference sources when possible."""

    payload = {
        "model": "sonar-pro",
        "messages": [
            {
                "role": "system",
                "content": system_prompt or default_system
            },
            {
                "role": "user",
                "content": query
            }
        ],
        "max_tokens": max_tokens,
        "temperature": 0.3,
        "return_citations": True,
        "search_recency_filter": "month"
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=60)
        if response.status_code != 200:
            print(f"Error Status: {response.status_code}")
            print(f"Error Body: {response.text}")
            return None
            
        result = response.json()
        content = result['choices'][0]['message']['content']
        citations = result.get('citations', [])
        return content, citations
    except Exception as e:
        print(f"Error: {e}")
        return None, []

def research_area_comprehensive(area_name, region_name):
    """Run multiple targeted queries for comprehensive area research"""
    
    all_content = []
    all_citations = []
    
    # Define research queries - each targets specific data
    queries = [
        {
            "title": "Demographics & Population",
            "query": f"""Research {area_name} in {region_name}, Spain:

1. Total population (2023/2024 census data)
2. Population growth trend over last 5 years
3. Percentage of foreign residents
4. Number of registered Scandinavian/Nordic residents (Swedish, Norwegian, Danish, Finnish)
5. Age demographics breakdown
6. Seasonal population variation (summer vs winter)
7. Number of registered properties/housing units"""
        },
        {
            "title": "Property Market & Prices",
            "query": f"""Research {area_name} property market in {region_name}, Spain 2024/2025:

1. Average property prices per square meter (€/m²) for:
   - Apartments
   - Townhouses
   - Villas
   - Penthouses
2. Price range breakdown (minimum to luxury)
3. Price evolution over last 3 years (percentage change)
4. Most expensive vs most affordable neighborhoods
5. Average transaction time for sales
6. Number of properties for sale currently
7. New development projects underway"""
        },
        {
            "title": "Climate & Weather",
            "query": f"""Research {area_name} climate in {region_name}, Spain:

1. Annual sunshine hours
2. Average temperatures by month (°C)
3. Annual rainfall (mm)
4. Humidity levels
5. Sea temperature by season
6. Comparison to Stockholm/Gothenburg climate
7. Best months for visiting/living
8. Any microclimatic factors"""
        },
        {
            "title": "Transport & Accessibility",
            "query": f"""Research {area_name} transport and accessibility in {region_name}, Spain:

1. Nearest international airport and distance (km, driving time)
2. Direct flights to Scandinavian cities (Stockholm, Oslo, Copenhagen, Helsinki)
3. Airlines operating these routes
4. Flight frequency and duration
5. Public transport options (bus, train, tram)
6. Highway/motorway connections
7. Distance to major cities (Madrid, Barcelona, Valencia)
8. Port/ferry connections if applicable"""
        },
        {
            "title": "Lifestyle & Amenities",
            "query": f"""Research {area_name} lifestyle and amenities in {region_name}, Spain:

1. Number of beaches and beach quality (Blue Flag status)
2. Golf courses within 30km (names and quality ratings)
3. Restaurants and dining scene
4. Shopping options (supermarkets, malls, markets)
5. Healthcare facilities (hospitals, international clinics)
6. International schools
7. Sports facilities
8. Cultural attractions and events
9. Nightlife and entertainment
10. Marina and water sports"""
        },
        {
            "title": "Neighborhoods & Districts",
            "query": f"""Research specific neighborhoods and districts in {area_name}, {region_name}, Spain:

For each main neighborhood/district provide:
1. Name and location
2. Character and atmosphere
3. Property types dominant
4. Price level (budget, mid-range, premium, luxury)
5. Best for (families, retirees, investors, etc.)
6. Pros and cons
7. Distance to beach/center

List at least 5-8 neighborhoods with details."""
        },
        {
            "title": "Investment & Rental",
            "query": f"""Research {area_name} as real estate investment in {region_name}, Spain:

1. Average rental yield percentage
2. Tourist rental license (VUT/VV) availability and requirements
3. Average rental prices per month (long-term)
4. Average daily rates for tourist rentals by season
5. Occupancy rates for vacation rentals
6. Property management costs
7. Community fees (comunidad) typical ranges
8. IBI (property tax) rates
9. Regulations affecting short-term rentals
10. Future development plans affecting property values"""
        }
    ]
    
    print(f"\n🔍 COMPREHENSIVE RESEARCH: {area_name}, {region_name}")
    print("=" * 60)
    
    for i, q in enumerate(queries, 1):
        print(f"\n📝 [{i}/{len(queries)}] Researching: {q['title']}...")
        result, citations = search_api(q['query'])
        
        if result:
            all_content.append(f"\n\n## {q['title']}\n\n{result}")
            all_citations.extend(citations)
            print(f"   ✓ Received {len(result)} characters")
        else:
            all_content.append(f"\n\n## {q['title']}\n\n*Research data not available*")
            print(f"   ✗ Failed to retrieve data")
        
        # Rate limiting - wait 2 seconds between queries
        if i < len(queries):
            time.sleep(2)
    
    # Combine all research
    combined = f"""# {area_name}, {region_name} - Comprehensive Research Report
    
*Generated: {time.strftime('%Y-%m-%d %H:%M')}*

{"".join(all_content)}

---

## Sources

"""
    # Add unique citations
    unique_citations = list(set(all_citations))
    for i, citation in enumerate(unique_citations[:20], 1):  # Limit to 20 sources
        combined += f"{i}. {citation}\n"
    
    return combined

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Comprehensive Area Research via Perplexity API')
    parser.add_argument('area', help='Area name (e.g., "La Manga del Mar Menor")')
    parser.add_argument('--region', default='Costa Cálida', help='Region name (default: Costa Cálida)')
    parser.add_argument('--output', help='Output file path')
    args = parser.parse_args()
    
    content = research_area_comprehensive(args.area, args.region)
    
    if content:
        if args.output:
            try:
                with open(args.output, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"\n✅ Research report written to: {args.output}")
                print(f"   Total length: {len(content)} characters")
            except Exception as e:
                print(f"Error writing to file: {e}")
        else:
            print(content)
