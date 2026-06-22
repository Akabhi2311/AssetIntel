from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime
)

from datetime import datetime

from app.database import Base


class QuizResult(Base):

    __tablename__ = "quiz_results"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer)

    topic = Column(String)

    question = Column(String)

    selected_answer = Column(String)

    correct_answer = Column(String)

    correct = Column(Boolean)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )