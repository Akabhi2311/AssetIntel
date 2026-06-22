from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./secondbrain.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False
)

Base = declarative_base()


# 🔥 IMPORT ALL MODELS HERE
# VERY IMPORTANT FOR SQLAlchemy TABLE CREATION

from app.models.user import User
from app.models.document import Document
from app.models.chunk import Chunk
from app.models.quiz import QuizResult
from app.models.summary import Summary


# 🔥 CREATE ALL TABLES
Base.metadata.create_all(bind=engine)


# 🔥 Dependency for FastAPI
def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()