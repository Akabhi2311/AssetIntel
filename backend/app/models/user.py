from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String, unique=True, index=True)

    password = Column(String, nullable=True)

    full_name = Column(String, nullable=True)
    profession = Column(String, nullable=True)

    college = Column(String, nullable=True)

    bio = Column(String, nullable=True)

    interests = Column(String, nullable=True)
    google_authenticated = Column(
        Boolean,
        default=False
    )