import os
import requests
import json
import sys
import argparse
from dotenv import load_dotenv

# Load environment variables
load_dotenv('.env.local')

API_KEY = os.getenv('PERPLEXITY_API_KEY')
if not API_KEY:
    print("Error: PERPLEXITY_API_KEY not found in .env.local")
    sys.exit(1)

def search_api(query):
    url = "https://api.perplexity.ai/chat/completions"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "sonar-pro",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant that provides detailed, accurate real estate data. return detailed answers with numbers, coordinates, and lists."
            },
            {
                "role": "user",
                "content": query
            }
        ]
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code != 200:
            print(f"Error Status: {response.status_code}")
            print(f"Error Body: {response.text}")
            return None
            
        result = response.json()
        return result['choices'][0]['message']['content']
    except Exception as e:
        print(f"Error: {e}")
        return None

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Search Perplexity API')
    parser.add_argument('query', help='Search query')
    parser.add_argument('--output', help='Output file path')
    args = parser.parse_args()
    
    content = search_api(args.query)
    
    if content:
        if args.output:
            try:
                with open(args.output, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Results written to {args.output}")
            except Exception as e:
                print(f"Error writing to file: {e}")
        else:
            print(content)
