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
                model="gemini-3-flash-preview",
                contents=f"""
You are ARISE (Akshit Raj Intelligent Super Engine).

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

            print(response)

            if hasattr(response, "text") and response.text:
                return response.text

            return str(response)

        except Exception as e:
            import traceback
            traceback.print_exc()
            return f"Error: {e}"