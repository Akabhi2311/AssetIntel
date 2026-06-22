from fastapi import APIRouter, Depends
from collections import defaultdict
from app.auth import get_current_user
from app.database import SessionLocal
from app.models.quiz import QuizResult

router = APIRouter()


@router.get("/insights")
def get_insights(user_id: int = Depends(get_current_user)):
    db = SessionLocal()

    quizzes = db.query(QuizResult).filter_by(user_id=user_id).all()

    topic_stats = defaultdict(lambda: {"total": 0, "correct": 0})

    for q in quizzes:
        topic_stats[q.topic]["total"] += 1
        if q.correct:
            topic_stats[q.topic]["correct"] += 1

    weak_topics = []
    strong_topics = []

    for topic, stats in topic_stats.items():
        accuracy = (stats["correct"] / stats["total"]) * 100

        if accuracy < 60:
            weak_topics.append({
                "topic": topic,
                "accuracy": int(accuracy)
            })
        else:
            strong_topics.append({
                "topic": topic,
                "accuracy": int(accuracy)
            })

    db.close()

    return {
        "weak_topics": sorted(weak_topics, key=lambda x: x["accuracy"]),
        "strong_topics": strong_topics
    }