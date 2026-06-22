from fastapi import APIRouter
from pydantic import BaseModel

from app.database import SessionLocal
from app.models.user import User

from app.auth import hash_password

router = APIRouter()


class CreatePasswordRequest(BaseModel):
    email: str
    password: str


@router.post("/create-password")
def create_password(req: CreatePasswordRequest):

    db = SessionLocal()

    user = db.query(User).filter(
        User.email == req.email
    ).first()

    if not user:

        return {"error": "User not found"}

    user.password = hash_password(req.password)

    db.commit()

    return {
        "message": "Password created"
    }