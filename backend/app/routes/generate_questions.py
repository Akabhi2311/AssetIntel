from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests
import json
import re

router = APIRouter()


class QuizRequest(BaseModel):
    topic: str
    num_questions: int


# ✅ VALIDATION FUNCTION
def validate_questions(data):
    valid_questions = []

    for q in data:
        if (
            isinstance(q, dict)
            and "question" in q
            and "options" in q
            and "answer" in q
            and isinstance(q["options"], list)
            and len(q["options"]) == 4
            and isinstance(q["answer"], str)
            and q["answer"] in q["options"]
        ):
            valid_questions.append(q)

    return valid_questions


# ✅ REMOVE DUPLICATES
def remove_duplicates(data):
    unique = []
    seen = set()

    for q in data:
        question_text = q.get("question", "").strip()

        if question_text and question_text not in seen:
            unique.append(q)
            seen.add(question_text)

    return unique


# ✅ CLEAN + EXTRACT JSON
def extract_json(text):
    # remove markdown
    text = text.replace("```json", "").replace("```", "").strip()

    # remove trailing garbage like """
    text = re.sub(r'"""$', '', text).strip()

    # extract JSON array
    match = re.search(r"\[.*\]", text, re.DOTALL)

    if not match:
        raise ValueError("❌ No valid JSON found in LLM output")

    return match.group(0)


@router.post("/generate-questions")
def generate_questions(req: QuizRequest):
    try:
        prompt = f"""You are a Plant Safety Inspector. Based on the provided Standard Operating Procedure (SOP) or technical manual, generate 3 multiple-choice questions to validate that a field technician is safe to perform work on this asset.

Every question must challenge knowledge of safety tolerances, mandatory PPE, or sequence validation rules found in the document.

Format the output strictly as a JSON list matching this structure:
[
  {
    "question": "What is the mandatory action before cracking the casing bolts on EQ-PUMP-101?",
    "options": ["Bleed downstream pressure via D-101", "Isolate the CCR radio line", "Increase flow rate to 450 m³/hr", "Remove casing clamp"],
    "correct_answer": "Bleed downstream pressure via D-101",
    "explanation": "According to the LOTO warning, downstream pressure must be completely bled via drain valve D-101."
  }
]
"""

        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "phi",
                "prompt": prompt,
                "stream": False,
                "options": {
                    "temperature": 0.2
                }
            }
        )

        result = response.json().get("response", "").strip()

        print("🧠 RAW LLM OUTPUT:", result)

        # 🔥 CLEAN + EXTRACT JSON
        clean_json = extract_json(result)

        # 🔥 PARSE JSON
        data = json.loads(clean_json)

        # 🔥 REMOVE DUPLICATES
        data = remove_duplicates(data)

        # 🔥 VALIDATE QUESTIONS
        data = validate_questions(data)

        # 🔥 ENSURE COUNT
        if len(data) < req.num_questions:
            raise ValueError("❌ Not enough valid questions generated")

        return {"questions": data[:req.num_questions]}

    except Exception as e:
        print("❌ QUIZ ERROR:", str(e))
        raise HTTPException(status_code=500, detail="Failed to generate quiz")