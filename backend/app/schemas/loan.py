from pydantic import BaseModel


class LoanCreate(BaseModel):
    lender_name: str
    loan_type: str
    outstanding_amount: float
    emi: float
    overdue_months: int
    monthly_income: float
class LoanUpdate(BaseModel):
    lender_name: str
    loan_type: str
    outstanding_amount: float
    emi: float
    overdue_months: int
    monthly_income: float
    status: str

class LoanResponse(LoanCreate):
    id: int
    status: str

    class Config:
        from_attributes = True