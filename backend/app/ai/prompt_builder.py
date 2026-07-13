def build_prompt(
    lender_name,
    loan_type,
    outstanding_amount,
    monthly_income,
    overdue_months,
):
    return f"""
You are a financial debt settlement advisor.

Customer Details:

Lender: {lender_name}
Loan Type: {loan_type}
Outstanding Amount: ₹{outstanding_amount}
Monthly Income: ₹{monthly_income}
Overdue Months: {overdue_months}

Provide:

1. Debt Risk Level
2. Recommended Settlement Percentage
3. Negotiation Strategy
4. Financial Advice
5. Next Steps

Keep the response professional and concise.
"""