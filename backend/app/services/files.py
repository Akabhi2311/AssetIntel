from fastapi import APIRouter
from app.services.vector_store import file_metadata

router = APIRouter()

@router.get("/files")
def get_files():
    return {
        "files": file_metadata
    }