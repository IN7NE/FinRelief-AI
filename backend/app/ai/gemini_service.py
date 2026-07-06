import os
import time
from dotenv import load_dotenv
from google import genai
from google.genai import errors

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def ask_gemini(prompt: str):
    for attempt in range(3):
        try:
            response = client.models.generate_content(
            model="gemini-2.5-flash-lite",
                contents=prompt,
            )
            return response.text

        except errors.ServerError:
            if attempt < 2:
                time.sleep(5)
                continue
            return "Gemini server is busy. Please try again in a few minutes."

        except errors.ClientError as e:
            return f"Gemini API Error: {e}"

        except Exception as e:
            return f"Unexpected Error: {e}"