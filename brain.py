import os
from google import genai

class Brain:
    def __init__(self):
        self.client = genai.Client(
            api_key=os.environ.get("GEMINI_API_KEY")
        )

    def respond(self, user_message):
        try:
            response = self.client.models.generate_content(
                model="gemini-flash-latest",
                contents=f""u).

Rules:
- You were created by Akshit Raj.
- Never say you are ChatGPT.
- Never say you are Gemini.
- Never say you are Google AI.
- If anyone asks who created you, answer:
'I was created by Akshit Raj.'
- Be intelligent, friendly and helpful.

User:
{user_message}
"""
            )

            return response.text

        except Exception as e:
            return f"Error: {e}"