from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.auth import get_current_user

from app.models.document import Document
from app.models.quiz import QuizResult

router = APIRouter()


@router.get("/recent-activity")
def get_recent_activity(
    user_id: int = Depends(get_current_user)
):

    db: Session = SessionLocal()

    activities = []

    # ======================
    # DOCUMENTS
    # ======================

    documents = (
        db.query(Document)
        .filter(Document.user_id == user_id)
        .order_by(Document.id.desc())
        .limit(5)
        .all()
    )

    for doc in documents:

        activities.append({
            "id": doc.id,
            "type": "upload",
            "title": f"📄 Uploaded {doc.filename}"
        })

    # ======================
    # QUIZZES
    # ======================

    quizzes = (
        db.query(QuizResult)
        .filter(QuizResult.user_id == user_id)
        .all()
    )

    topic_stats = {}

    for quiz in quizzes:

        topic = quiz.topic or "Unknown"

        if topic not in topic_stats:
            topic_stats[topic] = {
                "total": 0,
                "correct": 0,
                "latest_id": quiz.id
            }

        topic_stats[topic]["total"] += 1

        if quiz.correct:
            topic_stats[topic]["correct"] += 1

        if quiz.id > topic_stats[topic]["latest_id"]:
            topic_stats[topic]["latest_id"] = quiz.id

    for topic, stats in topic_stats.items():

        accuracy = int(
            (stats["correct"] / stats["total"]) * 100
        )

        activities.append({
            "id": stats["latest_id"],
            "type": "quiz",
            "title": (
                f"🧠 Quiz on {topic} "
                f"({accuracy}% accuracy)"
            )
        })

    # ======================
    # SORT
    # ======================

    activities.sort(
        key=lambda x: x["id"],
        reverse=True
    )

    db.close()

    return activities[:10]