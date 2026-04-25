import os
from google import genai
from google.genai import types

def generate_vardaan(context_summary: str) -> str:
    """Generates a 'Vardaan' (Blessing/Reflection) based on the conversation context.
    Call this at the end of a session when the user feels a moment of clarity or relief.
    context_summary: A brief summary of what was shared."""
    
    client = genai.Client(
        api_key=os.getenv("GOOGLE_API_KEY"),
        vertexai=os.getenv("GOOGLE_GENAI_USE_VERTEXAI", "FALSE") == "TRUE",
        project=os.getenv("GOOGLE_CLOUD_PROJECT"),
        location=os.getenv("GOOGLE_CLOUD_LOCATION")
    )
    
    prompt = f"""You are Karuna, the companion of compassion. 
    Based on this shared moment: '{context_summary}', 
    generate a 1-sentence 'Vardaan' (poetic blessing or reflection) in Hindi. 
    It should be beautiful, resonant, and gentle. Use simple but deep words.
    Return ONLY the Hindi sentence, no English translation."""
    
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )
    
    return response.text.strip()
