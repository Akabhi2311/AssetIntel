import fitz
import requests

from app.database import SessionLocal
from app.models.document import Document
from app.models.chunk import Chunk
from app.models.summary import Summary

from app.services.vector_store import add_text


def extract_text_from_pdf(pdf_bytes):
    text = ""

    pdf = fitz.open(stream=pdf_bytes, filetype="pdf")

    for page in pdf:
        text += page.get_text()

    return text


def chunk_text(text, chunk_size=500):
    chunks = []

    for i in range(0, len(text), chunk_size):
        chunks.append(text[i:i + chunk_size])

    return chunks


def generate_summary(text):
    try:
        prompt = f"""
Summarize the following document in 150-200 words.

DOCUMENT:
{text[:4000]}

SUMMARY:
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

        return result.get("response", "").strip()

    except:
        return "Summary generation failed."


def process_pdf(pdf_bytes, filename, user_id):
    text = extract_text_from_pdf(pdf_bytes)

    if not text.strip():
        raise ValueError(
            "❌ No text extracted from PDF (possibly scanned file)"
        )

    db = SessionLocal()

    # CHUNKS
    chunks = chunk_text(text)

    # SAVE DOCUMENT
    document = Document(
        filename=filename,
        user_id=user_id,
        content=text,
        chunk_count=len(chunks)
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    # CHUNKS
    chunks = chunk_text(text)

    for chunk in chunks:

        chunk_row = Chunk(
            user_id=user_id,
            document_id=document.id,
            content=chunk
        )

        db.add(chunk_row)

        add_text(
            user_id=user_id,
            text=chunk,
            document_id=document.id
        )

    # SUMMARY
    summary_text = generate_summary(text)

    summary = Summary(
        document_id=document.id,
        summary=summary_text
    )

    db.add(summary)

    db.commit()

    db.close()