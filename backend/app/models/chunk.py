from sqlalchemy import Column, Integer, Text, ForeignKey, DateTime
from datetime import datetime
from app.database import Base


class Chunk(Base):

    __tablename__ = "chunks"

    id = Column(Integer, primary_key=True, index=True)

    content = Column(Text)

    user_id = Column(Integer, ForeignKey("users.id"))

    document_id = Column(Integer, ForeignKey("documents.id"))

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )