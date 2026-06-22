from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime
)

from datetime import datetime

from app.database import Base


class Document(Base):

    __tablename__ = "documents"

    id = Column(Integer, primary_key=True)

    filename = Column(String)

    content = Column(Text)

    user_id = Column(Integer)
    chunk_count = Column(Integer, default=0)
    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )