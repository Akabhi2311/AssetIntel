from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.auth import get_current_user

from app.models.document import Document
from app.models.quiz import QuizResult

router = APIRouter()


# ================= DAILY ACTIVITY =================

@router.get("/activity")
def get_activity(
    user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    uploads = (
        db.query(
            func.date(Document.created_at).label("date"),
            func.count(Document.id).label("uploads")
        )
        .filter(Document.user_id == user_id)
        .group_by(func.date(Document.created_at))
        .all()
    )

    quizzes = (
        db.query(
            func.date(QuizResult.created_at).label("date"),
            func.count(QuizResult.id).label("quizzes")
        )
        .filter(QuizResult.user_id == user_id)
        .group_by(func.date(QuizResult.created_at))
        .all()
    )

    activity_map = {}

    for row in uploads:

        if str(row.date) not in activity_map:

            activity_map[str(row.date)] = {
                "date": str(row.date),
                "uploads": 0,
                "quizzes": 0,
                "queries": 0,
            }

        activity_map[str(row.date)]["uploads"] = row.uploads

    for row in quizzes:

        if str(row.date) not in activity_map:

            activity_map[str(row.date)] = {
                "date": str(row.date),
                "uploads": 0,
                "quizzes": 0,
                "queries": 0,
            }

        activity_map[str(row.date)]["quizzes"] = row.quizzes

    return list(activity_map.values())


# ================= RECENT ACTIVITY =================

@router.get("/recent-activity")
def get_recent_activity(
    user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    recent_docs = (
        db.query(Document)
        .filter(Document.user_id == user_id)
        .order_by(Document.id.desc())
        .limit(5)
        .all()
    )

    activities = []

    for doc in recent_docs:

        activities.append({
            "type": "upload",
            "title": f"Uploaded {doc.filename}",
        })

    return activities