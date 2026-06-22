from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import requests

from app.database import get_db
from app.auth import get_current_user
from app.models.document import Document

router = APIRouter()


@router.get("/summary/{doc_id}")
def get_summary(
    doc_id: int,
    user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    document = (
        db.query(Document)
        .filter(
            Document.id == doc_id,
            Document.user_id == user_id
        )
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    text = document.content[:12000]

    prompt = f"""You are an Industrial Reliability Engineer. Analyze the provided text from an incident log or operational manual, and extract a structured Root Cause Analysis data package.

Format your output exactly using these Markdown headers:
### 🛠️ Identified Equipment & Asset Tags
- Extract all tag numbers (e.g., EQ-PUMP-101, V-301)

### 🚨 Core Failure Mode
- Define exactly what broke or malfunctioned.

### 🔍 Underlying Root Cause
- Explain the systemic or mechanical failure mechanism.

### 📋 Recommended Preventive Actions
- List actionable steps to guarantee this condition does not recur.
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

    result = response.json()

    return {
        "summary": result.get("response", "")
    }