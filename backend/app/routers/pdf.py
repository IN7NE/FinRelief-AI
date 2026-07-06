from fastapi import APIRouter
from fastapi.responses import FileResponse
from pydantic import BaseModel

from app.services.pdf_service import generate_settlement_letter

router = APIRouter(
    prefix="/letter",
    tags=["Settlement Letter"],
)


class LetterRequest(BaseModel):
    lender_name: str
    loan_type: str
    outstanding_amount: float
    monthly_income: float
    overdue_months: int


@router.post("/download")
def download_letter(data: LetterRequest):

    file_path = generate_settlement_letter(data.dict())

    return FileResponse(
        path=file_path,
        filename="Settlement_Letter.pdf",
        media_type="application/pdf",
    )