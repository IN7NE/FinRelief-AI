from sqlalchemy.orm import Session
from app.models.loan import Loan
from app.schemas.loan import LoanCreate


def create_loan(db: Session, loan: LoanCreate, user_id: int):
    db_loan = Loan(
        lender_name=loan.lender_name,
        loan_type=loan.loan_type,
        outstanding_amount=loan.outstanding_amount,
        emi=loan.emi,
        overdue_months=loan.overdue_months,
        monthly_income=loan.monthly_income,
        user_id=user_id,
    )

    db.add(db_loan)
    db.commit()
    db.refresh(db_loan)

    return db_loan


def get_loans(db: Session):
    return db.query(Loan).all()


def get_loan(db: Session, loan_id: int):
    return db.query(Loan).filter(Loan.id == loan_id).first()


def delete_loan(db: Session, loan_id: int):
    loan = db.query(Loan).filter(Loan.id == loan_id).first()
def get_loans_by_status(db, status: str):
    return db.query(Loan).filter(Loan.status == status).all()
def get_dashboard_summary(db: Session):
    loans = db.query(Loan).all()

    total_loans = len(loans)
    total_amount = sum(loan.outstanding_amount for loan in loans)
    active = sum(1 for loan in loans if loan.status == "Active")

    return {
        "total_loans": total_loans,
        "active_loans": active,
        "total_outstanding": total_amount,
    }

    if loan:
        db.delete(loan)
        db.commit()

    return loan