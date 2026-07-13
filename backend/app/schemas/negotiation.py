from pydantic import BaseModel

class NegotiationRequest(BaseModel):
    lender_name: str
    loan_type: str
    outstanding_amount: float
    monthly_income: float
    overdue_months: int
    message: str