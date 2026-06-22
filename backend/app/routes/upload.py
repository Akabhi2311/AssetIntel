from fastapi import APIRouter, UploadFile, Depends
from app.services.processor import process_pdf
from app.auth import get_current_user

router = APIRouter()

@router.post("/upload")
async def upload_file(
    file: UploadFile,
    user_id: int = Depends(get_current_user)
):
    content = await file.read()
    process_pdf(content, file.filename, user_id)

    return {"message": "File processed successfully"}