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
    
    # Force JSON output structure in system prompt
    default_system = """You are an expert real estate researcher specializing in Spanish coastal properties for Scandinavian buyers.
    
    IMPORTANT: Provide your answer STRICTLY as a valid JSON object. 
    Do not include markdown formatting (like ```json), just the raw JSON object.
    
    The JSON structure must match the specific schema requested in the user prompt.
    Ensure all numbers are numbers, booleans are booleans, and strings are strings.
    Use "null" if data is unavailable.
    """

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
        "temperature": 0.2, # Lower temperature for valid JSON
        "return_citations": True,
        "search_recency_filter": "month"
    }
    
    print(f"DEBUG: API Key loaded: {API_KEY[:5]}... ({len(API_KEY)} chars)")
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=60)
        if response.status_code != 200:
            print(f"Error Status: {response.status_code}")
            print(f"Error Headers: {response.headers}")
            print(f"Error Body: {response.text}")
            return None, []
            
        result = response.json()
        content = result['choices'][0]['message']['content']
        citations = result.get('citations', [])
        
        # Clean markdown if present
        if content.startswith("```json"):
            content = content.replace("```json", "").replace("```", "")
        elif content.startswith("```"):
            content = content.replace("```", "")
            
        return content.strip(), citations
    except Exception as e:
        print(f"Error: {e}")
        return None, []

def research_area_deep(area_name, region_name):
    """Run targeted queries for deep structured research"""
    
    print(f"\n🔍 DEEP RESEARCH: {area_name}, {region_name}")
    print("=" * 60)

    # 1. Demographics & Quick Facts
    q1 = f"""Research {area_name} in {region_name}, Spain. Return a JSON object with this EXACT structure:
    {{
        "quickFacts": {{
            "population": {{ "value": number, "year": number, "source": "string" }},
            "foreignPercentage": {{ "value": number, "source": "string" }},
            "swedesEstimate": {{ "value": number, "note": "string" }},
            "airportDistance": {{ "km": number, "minutes": number, "airport": "string" }},
            "directFlights": {{ "airlines": ["string"], "frequencyPerWeek": number }},
            "pricePerM2": {{ "value": number, "source": "string", "year": number }},
            "sunshineHours": {{ "value": number }},
            "averageTemp": {{ "annual": number, "january": number, "july": number }}
        }},
        "whySwedes": ["string", "string", "string"],
        "notSuitableFor": ["string", "string"]
    }}
    Focus on data relevant to Scandinavian buyers.
    """
    
    # 2. Detailed Content Sections
    q2 = f"""Research {area_name} in {region_name}, Spain. Return a JSON object with this EXACT structure:
    {{
        "intro": "concise, engaging introduction for Scandinavian buyers",
        "lifestyle": "detailed description of daily life, atmosphere, and vibe",
        "climate": "climate description focused on winter warmth and summer heat",
        "attractions": "key sights and activities",
        "transport": "detailed transport options including distance to Alicante/Murcia airports",
        "propertyMarket": "current market analysis 2024/2025, price trends, areas to watch",
        "buyingTips": "specific advice for buyers in this area (best streets, pitfalls)"
    }}
    """

    # 3. Districts & Highlights (Visuals)
    q3 = f"""Research {area_name} in {region_name}, Spain. Return a JSON object with this EXACT structure:
    {{
        "districts": [
            {{
                "name": "string",
                "character": "string",
                "pricePerM2": number,
                "suitableFor": ["string"],
                "pros": ["string"],
                "cons": ["string"]
            }}
        ],
        "highlights": [
            {{ "icon": "string (choose from: sun, beach, golf, history, food, nature)", "title": "string", "description": "string" }}
        ],
        "faq": [
            {{ "question": "string", "answer": "string" }}
        ]
    }}
    """

    results = {}
    
    # Execute Queries
    print("\n📝 Query 1/3: Demographics & Facts...")
    res1, _ = search_api(q1)
    if res1: 
        try:
            results.update(json.loads(res1))
            print("   ✓ Parsed JSON successfully")
        except:
            print("   ✗ JSON Parse Error (Q1)")
            print(res1)
            
    print("\n📝 Query 2/3: Content Sections...")
    res2, _ = search_api(q2)
    if res2:
        try:
            results["content"] = json.loads(res2)
            print("   ✓ Parsed JSON successfully")
        except:
            print("   ✗ JSON Parse Error (Q2)")
            print(res2)

    print("\n📝 Query 3/3: Districts & Details...")
    res3, _ = search_api(q3)
    if res3:
        try:
            results.update(json.loads(res3))
            print("   ✓ Parsed JSON successfully")
        except:
             print("   ✗ JSON Parse Error (Q3)")
             print(res3)

    return results

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Deep Area Research')
    parser.add_argument('area', help='Area name')
    parser.add_argument('--region', default='Costa Cálida', help='Region name')
    parser.add_argument('--output', help='Output file')
    args = parser.parse_args()
    
    data = research_area_deep(args.area, args.region)
    
    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"\n✅ Data saved to: {args.output}")
    else:
        print(json.dumps(data, indent=2, ensure_ascii=False))
