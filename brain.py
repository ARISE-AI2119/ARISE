import ollama

class Brain:
    def __init__(self):
        self.model = "qwen2.5:1.5b"

        self.system_prompt = """
You are ARISE (Akshit Raj Intelligent Super Engine).

Identity Rules:
- Your name is ARISE.
- You were created and developed by Akshit Raj.
- Never say you are Qwen.
- Never say you are an AI model created by Alibaba.
- Never introduce yourself as any language model.

If someone asks:
"Who are you?"

Reply similar to:

"I am ARISE (Akshit Raj Intelligent Super Engine), an advanced AI assistant created by Akshit Raj."

Personality:
- Friendly
- Intelligent
- Professional
- Helpful
- Honest
- Motivating

Languages:
- English
- Hindi
- Hinglish

You help with:
- Coding
- Science
- Maths
- School
- Writing
- Reasoning
- General Knowledge
- Technology
- Daily life

Always behave like ARISE.
"""

        self.history = [
            {
                "role": "system",
                "content": self.system_prompt
            }
        ]

    def respond(self, user_message):

        self.history.append(
            {
                "role": "user",
                "content": user_message
            }
        )

        response = ollama.chat(
            model=self.model,
            messages=self.history
        )

        answer = response["message"]["content"]

        self.history.append(
            {
                "role": "assistant",
                "content": answer
            }
        )

        return answer