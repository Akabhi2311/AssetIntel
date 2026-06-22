from fastapi import APIRouter
from pydantic import BaseModel

from app.database import SessionLocal
from app.models.user import User

router = APIRouter()


class GoogleSignupRequest(BaseModel):
    email: str
    name: str


@router.post("/google-signup")
def google_signup(req: GoogleSignupRequest):

    db = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == req.email
    ).first()

    if existing_user:

        return {
            "message": "User already exists",
            "new_user": False
        }

    user = User(
        email=req.email,
        full_name=req.name,
        google_authenticated=True
    )

    db.add(user)

    db.commit()

    return {
        "message": "User created",
        "new_user": True
    }