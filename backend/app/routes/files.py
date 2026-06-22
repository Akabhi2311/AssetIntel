from fastapi import APIRouter, Depends

from app.auth import get_current_user
from app.database import SessionLocal
from app.models.document import Document

router = APIRouter()


@router.get("/files")
def get_files(
    user_id: int = Depends(get_current_user)
):

    db = SessionLocal()

    documents = db.query(Document).filter_by(
        user_id=user_id
    ).all()

    result = []

    for doc in documents:
        result.append({
            "id": doc.id,
            "filename": doc.filename
        })

    db.close()

    return result