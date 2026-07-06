from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/negotiation",
    tags=["Negotiation"],
)


class NegotiationRequest(BaseModel):
    message: str


@router.post("/chat")
def chat(data: NegotiationRequest):
    msg = data.message.lower()

    if "salary" in msg or "income" in msg:
        reply = (
            "Considering your financial condition, "
            "we can reduce your settlement to ₹72,000."
        )

    elif "cannot pay" in msg or "can't pay" in msg:
        reply = (
            "We understand your situation. "
            "Our first offer is ₹82,000."
        )

    elif "65000" in msg or "65,000" in msg:
        reply = (
            "After reviewing your request, "
            "our final offer is ₹68,000."
        )

    else:
        reply = (
            "Please tell us more about your financial situation."
        )

    return {
        "reply": reply
    }