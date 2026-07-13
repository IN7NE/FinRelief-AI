from sqlalchemy import Column, Integer, Float, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class Loan(Base):
    __tablename__ = "loans"

    id = Column(Integer, primary_key=True, index=True)

    lender_name = Column(String, nullable=False)

    loan_type = Column(String, nullable=False)

    outstanding_amount = Column(Float, nullable=False)

    emi = Column(Float, nullable=False)

    overdue_months = Column(Integer, default=0)

    monthly_income = Column(Float, nullable=False)

    status = Column(String, default="Active")

    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="loans")