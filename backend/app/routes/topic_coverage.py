from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth import get_current_user
from app.models.quiz import QuizResult

router = APIRouter()


@router.get("/topic-coverage")
def get_topic_coverage(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):

    results = db.query(QuizResult)\
        .filter(QuizResult.user_id == user_id)\
        .all()

    topic_stats = {}

    for q in results:

        if q.topic not in topic_stats:
            topic_stats[q.topic] = {
                "total": 0,
                "correct": 0
            }

        topic_stats[q.topic]["total"] += 1

        if q.correct:
            topic_stats[q.topic]["correct"] += 1

    final = []

    for topic, stats in topic_stats.items():

        accuracy = (
            stats["correct"] / stats["total"]
        ) * 100

        final.append({
            "topic": topic,
            "accuracy": round(accuracy, 1)
        })

    return final