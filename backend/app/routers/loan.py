from app.schemas.loan import LoanCreate, LoanResponse, LoanUpdate
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.services.loan_service import (
    create_loan,
    get_loans,
    get_loan,
    delete_loan,
)
from app.services.loan_service import (
    create_loan,
    get_loans,
    get_loan,
    delete_loan,
    update_loan,
    get_loans_by_status,
    get_dashboard_summary,
)

router = APIRouter(
    prefix="/loans",
    tags=["Loans"],
)


@router.post("/", response_model=LoanResponse)
def add_loan(loan: LoanCreate, db: Session = Depends(get_db)):
    return create_loan(db, loan, user_id=1)


@router.get("/", response_model=list[LoanResponse])
def all_loans(db: Session = Depends(get_db)):
    return get_loans(db)


@router.get("/{loan_id}", response_model=LoanResponse)
def single_loan(loan_id: int, db: Session = Depends(get_db)):
    loan = get_loan(db, loan_id)

    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")

    return loan
@router.put("/{loan_id}", response_model=LoanResponse)
def edit_loan(
    loan_id: int,
    loan: LoanUpdate,
    db: Session = Depends(get_db),
):
    updated = update_loan(db, loan_id, loan)

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Loan not found",
        )

    return updated

@router.delete("/{loan_id}")
def remove_loan(loan_id: int, db: Session = Depends(get_db)):
    loan = delete_loan(db, loan_id)

    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")

    return {"message": "Loan deleted successfully"}
@router.get("/status/{status}", response_model=list[LoanResponse])
def loans_by_status(status: str, db: Session = Depends(get_db)):
    return get_loans_by_status(db, status)


@router.get("/summary/dashboard")
def dashboard(db: Session = Depends(get_db)):
    return get_dashboard_summary(db)