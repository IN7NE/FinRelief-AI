from sqlalchemy.orm import Session
from app.models.loan import Loan
from app.schemas.loan import LoanCreate, LoanUpdate, LoanResponse


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

    if loan:
        db.delete(loan)
        db.commit()

    return loan


def get_loans_by_status(db: Session, status: str):
    return db.query(Loan).filter(Loan.status == status).all()


def get_dashboard_summary(db: Session):
    loans = db.query(Loan).all()

    total_loans = len(loans)

    total_outstanding = sum(
        loan.outstanding_amount for loan in loans
    )

    total_emi = sum(
        loan.emi for loan in loans
    )

    total_income = sum(
        loan.monthly_income for loan in loans
    )

    active_loans = sum(
        1 for loan in loans
        if loan.status == "Active"
    )

    latest = (
        db.query(Loan)
        .order_by(Loan.id.desc())
        .first()
    )

    recent_loan = None

    if latest:
        recent_loan = {
            "bank": latest.lender_name,
            "loan_type": latest.loan_type,
            "outstanding": latest.outstanding_amount,
            "emi": latest.emi,
            "overdue": latest.overdue_months,
            "status": latest.status,
        }

    return {
        "total_loans": total_loans,
        "active_loans": active_loans,
        "total_outstanding": total_outstanding,
        "total_emi": total_emi,
        "total_income": total_income,
        "recent_loan": recent_loan,
    }

def update_loan(db: Session, loan_id: int, loan_data: LoanUpdate):
    loan = db.query(Loan).filter(Loan.id == loan_id).first()

    if not loan:
        return None

    loan.lender_name = loan_data.lender_name
    loan.loan_type = loan_data.loan_type
    loan.outstanding_amount = loan_data.outstanding_amount
    loan.emi = loan_data.emi
    loan.overdue_months = loan_data.overdue_months
    loan.monthly_income = loan_data.monthly_income
    loan.status = loan_data.status

    db.commit()
    db.refresh(loan)

    return loan