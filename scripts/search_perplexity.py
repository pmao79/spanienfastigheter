import os
import requests
import json
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv('.env.local')

API_KEY = os.getenv('PERPLEXITY_API_KEY')
if not API_KEY:
    print("Error: PERPLEXITY_API_KEY not found in .env.local")
    sys.exit(1)

def search(query):
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
            sys.exit(1)
            
        result = response.json()
        print(result['choices'][0]['message']['content'])
    except Exception as e:
        print(f"Error: {e}")
        if response.text:
            print(f"Response: {response.text}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python search_perplexity.py <query>")
        sys.exit(1)
    
    query = " ".join(sys.argv[1:])
    search(query)
