from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Database Imports
from app.database import engine, Base, SessionLocal
from app.models import user, document, chunk, quiz
from app.models.document import Document
from app.models.chunk import Chunk

# Authentication & Middleware Imports
from app.auth import get_current_user

# Router Core Imports
from app.routes.generate_questions import router as question_router
from app.routes import upload, query, auth, quiz as quiz_module, insights, recommendations
from app.routes.files import router as files_router
from app.routes.stats import router as stats_router
from app.routes.summary import router as summary_router
from app.routes.delete_document import router as delete_router
from app.routes.analytics import router as analytics_router
from app.routes.topic_coverage import router as topic_router
from app.routes.activity import router as activity_router
from app.routes.recent_activity import router as recent_activity_router
from app.routes.google_signup import router as google_signup_router
from app.routes.create_password import router as create_password_router
from app.routes.reset_password import router as reset_password_router
from app.routes import profile

# Initialize Database Schema Tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI Application Context
app = FastAPI(title="AssetIntel Central Core Engine")

# ✅ CORS Middleware Configuration Layer (Crucial for Frontend Communications)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Restrict to explicit origins post-hackathon production deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Schema Model for Technician Passport Pipeline
class ProfileUpdateRequest(BaseModel):
    name: str | None = None
    profession: str | None = None
    college: str | None = None
    interests: str | None = None
    bio: str | None = None

# Global In-Memory Runtime Profile Cache Map
PROFILE_SESSION_CACHE = {}


# =================================================================
# ROUTER REGISTRY INCLUSIONS
# =================================================================
app.include_router(quiz_module.router)
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(insights.router)
app.include_router(recommendations.router)
app.include_router(summary_router)
app.include_router(delete_router)
app.include_router(analytics_router)
app.include_router(topic_router)
app.include_router(activity_router)
app.include_router(recent_activity_router)
app.include_router(google_signup_router)
app.include_router(create_password_router)
app.include_router(reset_password_router)
app.include_router(profile.router)
app.include_router(upload.router)
app.include_router(query.router)
app.include_router(files_router)
app.include_router(stats_router)
app.include_router(question_router)


# =================================================================
# EXPLICIT HIGH-PRIORITY FIELD OPERATIONS ENDPOINTS
# =================================================================

@app.delete("/delete-file/{file_id}")
def delete_file(
    file_id: int, 
    user_id: int = Depends(get_current_user)
):
    """
    Deletes the targeted asset record from the database 
    and clears all downstream vector space dependencies.
    """
    db = SessionLocal()
    try:
        # Isolate document query strictly to active verifying operator node
        document_record = db.query(Document).filter_by(id=file_id, user_id=user_id).first()
        
        if not document_record:
            raise HTTPException(
                status_code=404, 
                detail="Target asset record not found or access clearance denied"
            )
        
        # Purge localized database structural chunks first
        db.query(Chunk).filter_by(document_id=file_id).delete()
        
        # Purge central file index entry node
        db.delete(document_record)
        db.commit()
        
        return {
            "status": "success",
            "message": f"Asset registration node {file_id} purged successfully"
        }
        
    except Exception as e:
        db.rollback()
        print("❌ PURGE ERROR:", str(e))
        raise HTTPException(status_code=500, detail=str(e))
        
    finally:
        db.close()


@app.get("/user/profile")
def get_user_profile(user_id: int = Depends(get_current_user)):
    """
    Fetches credentials from the runtime session cache, 
    falling back to initial default operator parameters if clean.
    """
    return PROFILE_SESSION_CACHE.get(user_id, {
        "name": "Sanskar5544",
        "profession": "AI Engineer / Student",
        "college": "Your College",
        "interests": "AI, ML, Systems & Distributed Networks",
        "bio": "Stationed at central core processing operations."
    })


@app.post("/user/profile")
def update_user_profile(
    req: ProfileUpdateRequest, 
    user_id: int = Depends(get_current_user)
):
    """
    Caches updated technician passport tracking specifications instantly.
    """
    PROFILE_SESSION_CACHE[user_id] = {
        "name": req.name,
        "profession": req.profession,
        "college": req.college,
        "interests": req.interests,
        "bio": req.bio
    }
    return {
        "status": "success", 
        "message": "Field credentials synced to active session memory",
        "data": PROFILE_SESSION_CACHE[user_id]
    }