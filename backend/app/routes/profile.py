from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.database import SessionLocal
from app.models.user import User
from app.auth import get_current_user

router = APIRouter()


class ProfileUpdate(BaseModel):
    full_name: str | None = None
    profession: str | None = None
    college: str | None = None
    bio: str | None = None
    interests: str | None = None


@router.get("/profile")
def get_profile(
    user_id: int = Depends(get_current_user)
):
    db = SessionLocal()

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    db.close()

    return {
        "full_name": user.full_name,
        "email": user.email,
        "profession": user.profession,
        "college": user.college,
        "bio": user.bio,
        "interests": user.interests,
    }


@router.put("/profile")
def update_profile(
    req: ProfileUpdate,
    user_id: int = Depends(get_current_user)
):
    db = SessionLocal()

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if req.full_name:
        user.full_name = req.full_name

    if req.profession:
        user.profession = req.profession

    if req.college:
        user.college = req.college

    if req.bio:
        user.bio = req.bio

    if req.interests:
        user.interests = req.interests

    db.commit()

    db.close()

    return {
        "message": "Profile updated"
    }