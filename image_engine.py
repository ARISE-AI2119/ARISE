from google import genai
import os


class ImageEngine:

    def __init__(self):

        self.client = genai.Client(
            api_key=os.environ.get("GEMINI_API_KEY")
        )

    def generate_image(self, prompt):

        return {
            "success": False,
            "message": "Image Generation Engine Initialized (Coming Soon)"
        }