from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.db import engine
from app.database.base import Base
from app.routers.auth import router as auth_router
from app.routers.loan import router as loan_router
from app.routers.settlement import router as settlement_router
from app.routers.ai import router as ai_router
from app.routers.pdf import router as pdf_router
from app.routers.negotiation import router as negotiation_router
# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FinRelief AI API",
    description="AI Powered Debt Relief & Financial Recovery Platform",
    version="1.0.0",
)
app.include_router(auth_router)
app.include_router(loan_router)
app.include_router(settlement_router)
app.include_router(ai_router)
app.include_router(pdf_router)
app.include_router(negotiation_router)


# Allow React frontend to access backend
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Welcome to FinRelief AI",
        "status": "Backend Running Successfully"
    }


@app.get("/health")
def health_check():
    return {
        "status": "Healthy",
        "service": "FinRelief AI Backend"
    }