
import base64
print("Base64 imported successfully")
encoded = base64.b64encode(b"test")
print(f"Encoded: {encoded}")
decoded = base64.b64decode(encoded)
print(f"Decoded: {decoded}")
