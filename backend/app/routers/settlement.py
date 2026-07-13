from fastapi import APIRouter

from app.schemas.loan import LoanCreate
from app.services.settlement_service import calculate_settlement

router = APIRouter(
    prefix="/settlement",
    tags=["Settlement"],
)


@router.post("/recommend")
def recommend(data: LoanCreate):

    result = calculate_settlement(
        outstanding_amount=data.outstanding_amount,
        emi=data.emi,
        monthly_income=data.monthly_income,
        overdue_months=data.overdue_months,
    )

    return result