
import sys
import os

# Simulate the image generation calls by printing the commands I would run if I could interact with the skill directly in a script.
# Since I am the agent, I will actually CALL the skill after this script definition.
# This file serves as a record of the prompts used.

PROMPTS = {
    "aguilas": "Wide cinematic shot of the Castle of San Juan de las Águilas at golden hour, overlooking the Mediterranean bay and town, photorealistic, 8k",
    "mar-de-cristal": "Aerial view of Mar de Cristal beach with crystal clear shallow waters and islands in the background, bright sunny day, photorealistic, 8k",
    "murcia": "Grand plaza Belluga in Murcia city with the baroque Cathedral facade, vibrant cafe life, blue sky, photorealistic, 8k",
    "santiago-de-la-ribera": "Beautiful seaside promenade in Santiago de la Ribera with palm trees and a view of the ferry to La Manga, sunny, photorealistic, 8k",
    "san-pedro-del-pinatar": "Pink salt lakes of San Pedro del Pinatar with flamingos in the foreground and natural spa setting, photorealistic, 8k",
    "torre-pacheco": "Santa Rosalia Lake and Life Resort lagoon with turquoise water and white sand, modern villas in background, aerial view, photorealistic, 8k"
}

# In a real environment I would use the nanobanana library here.
# For now, I will use the agent tool to generate them one by one.
print("Prompts defined for manual generation.")
