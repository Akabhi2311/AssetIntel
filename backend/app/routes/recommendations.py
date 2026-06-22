from fastapi import APIRouter, Depends
from app.auth import get_current_user
from app.database import SessionLocal
from app.models.quiz import QuizResult
from collections import defaultdict

router = APIRouter()


@router.get("/recommendations")
def get_recommendations(user_id: int = Depends(get_current_user)):
    db = SessionLocal()

    quizzes = db.query(QuizResult).filter_by(user_id=user_id).all()
    db.close()

    topic_stats = defaultdict(lambda: {"total": 0, "correct": 0})

    for q in quizzes:
        topic_stats[q.topic]["total"] += 1
        if q.correct:
            topic_stats[q.topic]["correct"] += 1

    recommendations = []

    for topic, stats in topic_stats.items():
        accuracy = (stats["correct"] / stats["total"]) * 100

        if accuracy < 60:
            recommendations.append(
                f"📉 Focus more on {topic} (accuracy {int(accuracy)}%)"
            )

    if not recommendations:
        recommendations.append("🎉 You're performing well across all topics!")

    return {"recommendations": recommendations}