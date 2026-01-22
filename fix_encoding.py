
import os

file_path = r"c:\Users\marcu\spanienfastigheter\spanienfastigheter\components\property\PropertyDetails.tsx"

replacements = {
    'Ã¥': 'å',
    'Ã¤': 'ä',
    'Ã¶': 'ö',
    'Ã…': 'Å',
    'Ã„': 'Ä',
    'Ã–': 'Ö',
    'â‚¬': '€',
    'Â²': '²',
    'Ã©': 'é',
    'Ã‘': 'Ñ',
    'Ã±': 'ñ',
    'Â': '' # Be careful with this one, but often Â is a non-breaking space artifact 0xC2 0xA0 -> Â <nbsp>. But if it was Â² (0xC2 0xB2), we handled it. If we have 0xC2 0xA0 (NBSP) displayed as Â<space>, we might want to just remove Â? 
    # Actually, in UTF8, NBSP is C2 A0. If interpreted as Win1252, it's Â (C2) and NBSP (A0). 
    # Let's stick to the multi-char sequences first.
}

# specific fixes for things that might have split weirdly if any
# But based on the file view, they look like standard Mojibake sequences.

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Apply replacements
# Order matters slightly, but these are mostly distinct.
# However, 'Â²' should be done before 'Â' if I were to remove 'Â'.
# I won't blindly remove 'Â' genericly unless I'm sure. 
# Looking at 'mÂ²', I replace that with 'm²'.
# Are there other Â?
# In 'NÃ¤ra', it's Ã¤.

# Let's just do the main Swedish ones and Euro/Squares.
keys = ['Ã¥', 'Ã¤', 'Ã¶', 'Ã…', 'Ã„', 'Ã–', 'â‚¬', 'Â²']
values = ['å', 'ä', 'ö', 'Å', 'Ä', 'Ö', '€', '²']

for k, v in zip(keys, values):
    content = content.replace(k, v)

# Check for any remaining common ones
remaining_weird = ['Ã', 'Â']
for r in remaining_weird:
    if r in content:
        print(f"Warning: Found remaining '{r}' in content.")
        # Print context
        idx = content.find(r)
        print(f"Context: {content[max(0, idx-10):min(len(content), idx+10)]}")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed encoding issues.")
