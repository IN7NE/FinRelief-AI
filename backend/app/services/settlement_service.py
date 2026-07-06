def calculate_settlement(
    outstanding_amount: float,
    emi: float,
    monthly_income: float,
    overdue_months: int,
):
    # Prevent division by zero
    if monthly_income <= 0:
        monthly_income = 1

    emi_ratio = (emi / monthly_income) * 100

    # DEBUG
    print("========== SETTLEMENT DEBUG ==========")
    print("Outstanding:", outstanding_amount)
    print("EMI:", emi)
    print("Monthly Income:", monthly_income)
    print("EMI Ratio:", emi_ratio)
    print("======================================")

    if emi_ratio > 60:
        recommendation = outstanding_amount * 0.55
    elif emi_ratio > 40:
        recommendation = outstanding_amount * 0.70
    else:
        recommendation = outstanding_amount * 0.85

    savings = outstanding_amount - recommendation

    if emi_ratio > 60:
        debt_stress = "High"
        advice = "Your debt burden is very high. Negotiate immediately."
    elif emi_ratio > 40:
        debt_stress = "Medium"
        advice = "You should negotiate with the lender for a better settlement."
    else:
        debt_stress = "Low"
        advice = "You can continue paying EMI or negotiate for small savings."

    return {
        "recommended_settlement": round(recommendation, 2),
        "settlement_percentage": round(
            recommendation / outstanding_amount * 100,
            2,
        ),
        "emi_ratio": round(emi_ratio, 2),
        "debt_stress": debt_stress,
        "overdue_months": overdue_months,
        "savings": round(savings, 2),
        "advice": advice,
    }