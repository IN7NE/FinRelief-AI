from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.ai.gemini_service import ask_gemini
from app.ai.prompt_builder import build_prompt

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


class AIRequest(BaseModel):
    lender_name: str
    loan_type: str
    outstanding_amount: float
    monthly_income: float
    overdue_months: int


class NegotiationRequest(BaseModel):
    lender_name: str
    loan_type: str
    outstanding_amount: float
    monthly_income: float
    overdue_months: int
    message: str


@router.post("/analyze")
def analyze(data: AIRequest):
    try:
        prompt = build_prompt(
            lender_name=data.lender_name,
            loan_type=data.loan_type,
            outstanding_amount=data.outstanding_amount,
            monthly_income=data.monthly_income,
            overdue_months=data.overdue_months,
        )

        answer = ask_gemini(prompt)

        return {
            "analysis": answer
        }

    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"AI Service Error: {str(e)}"
        )


@router.post("/negotiate")
def negotiate(data: NegotiationRequest):
    try:
        prompt = f"""
You are an experienced bank settlement officer.

Outstanding Amount: ₹{data.outstanding_amount}
Monthly Income: ₹{data.monthly_income}
Overdue Months: {data.overdue_months}

Conversation:

{data.message}

Reply like a real bank officer.
Negotiate professionally.
Keep replies under 120 words.
"""

        answer = ask_gemini(prompt)

        return {
            "reply": answer
        }

    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"AI Service Error: {str(e)}"
        )