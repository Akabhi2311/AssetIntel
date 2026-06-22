from fastapi import APIRouter
from pydantic import BaseModel

from app.database import SessionLocal
from app.models.user import User

from app.auth import (
    verify_password,
    create_access_token
)

router = APIRouter()


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/login")
def login(req: LoginRequest):

    db = SessionLocal()

    user = db.query(User).filter(
        User.email == req.email
    ).first()

    if not user:

        return {
            "error": "User not found"
        }

    if not user.password:

        return {
            "error": "Please create password first"
        }

    valid = verify_password(
        req.password,
        user.password
    )

    if not valid:

        return {
            "error": "Invalid password"
        }

    token = create_access_token({
        "sub": str(user.id)
    })

    return {
        "token": token,
        "user_id": user.id
    }