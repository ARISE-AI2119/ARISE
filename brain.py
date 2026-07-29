import os
import requests

class Brain:
    def __init__(self):
        self.api_key = os.environ.get("OPENROUTER_API_KEY")

    def respond(self, user_message):
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

        data = {
            "model": "deepseek/deepseek-chat-v3.1:free",
            "messages": [
                {
                    "role": "system",
                    "content": (
                        "You are ARISE (Akshit Raj Intelligent Super Engine). "
                        "You were created by Akshit Raj. "
                        "Never say you are ChatGPT, DeepSeek, OpenAI or any other model. "
                        "If asked who created you, always answer: "
                        "'I was created by Akshit Raj.' "
                        "Be friendly, intelligent and helpful."
                    )
                },
                {
                    "role": "user",
                    "content": user_message
                }
            ]
        }

        try:
            response = requests.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers=headers,
                json=data,
                timeout=60
            )

            result = response.json()

            if "choices" in result:
                return result["choices"][0]["message"]["content"]

            return f"OpenRouter Error: {result}"

        except Exception as e:
            return f"Error: {str(e)}"