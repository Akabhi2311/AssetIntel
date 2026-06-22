from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.auth import get_current_user

from app.models.document import Document
from app.models.chunk import Chunk
from app.models.quiz import QuizResult

router = APIRouter()


@router.get("/stats")
def get_stats(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):

    # TOTAL DOCUMENTS
    total_documents = db.query(Document)\
        .filter(Document.user_id == user_id)\
        .count()

    # TOTAL CHUNKS
    total_chunks = db.query(Chunk)\
        .filter(Chunk.user_id == user_id)\
        .count()

    # TOTAL QUIZZES
    total_quizzes = db.query(QuizResult)\
        .filter(QuizResult.user_id == user_id)\
        .count()

    # CORRECT ANSWERS
    correct_answers = db.query(QuizResult)\
        .filter(
            QuizResult.user_id == user_id,
            QuizResult.correct == True
        )\
        .count()

    # ACCURACY %
    retrieval_quality = 0

    if total_quizzes > 0:
        retrieval_quality = int(
            (correct_answers / total_quizzes) * 100
        )

    # WEAK TOPICS
    topic_stats = {}

    results = db.query(QuizResult)\
        .filter(QuizResult.user_id == user_id)\
        .all()

    for q in results:

        if q.topic not in topic_stats:
            topic_stats[q.topic] = {
                "total": 0,
                "correct": 0
            }

        topic_stats[q.topic]["total"] += 1

        if q.correct:
            topic_stats[q.topic]["correct"] += 1

    weak_topics = 0

    for topic in topic_stats:

        total = topic_stats[topic]["total"]
        correct = topic_stats[topic]["correct"]

        accuracy = (correct / total) * 100

        if accuracy < 50:
            weak_topics += 1

    return {
        "total_documents": total_documents,
        "total_chunks": total_chunks,
        "questions_answered": total_quizzes,
        "retrieval_quality": retrieval_quality,
        "weak_topics": weak_topics
    }