from fastapi import APIRouter, Depends

from app.auth import get_current_user
from app.database import SessionLocal

from app.models.document import Document
from app.models.chunk import Chunk
from app.models.summary import Summary

router = APIRouter()


@router.delete("/delete-document/{document_id}")
def delete_document(
    document_id: int,
    user_id: int = Depends(get_current_user)
):

    db = SessionLocal()

    # 🔥 FIND DOCUMENT
    document = db.query(Document).filter_by(
        id=document_id,
        user_id=user_id
    ).first()

    if not document:
        db.close()

        return {
            "message": "Document not found"
        }

    # 🔥 DELETE CHUNKS
    db.query(Chunk).filter_by(
        document_id=document_id
    ).delete()

    # 🔥 DELETE SUMMARY
    db.query(Summary).filter_by(
        document_id=document_id
    ).delete()

    # 🔥 DELETE DOCUMENT
    db.delete(document)

    db.commit()

    db.close()

    return {
        "message": "Document deleted successfully"
    }