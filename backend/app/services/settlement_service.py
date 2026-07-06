def calculate_settlement(
    outstanding_amount: float,
    emi: float,
    monthly_income: float,
    overdue_months: int,
):
    """
    AI-inspired settlement recommendation logic.
    """

    emi_ratio = (emi / monthly_income) * 100

    if emi_ratio > 60:
        recommendation = outstanding_amount * 0.55

    elif emi_ratio > 40:
        recommendation = outstanding_amount * 0.70

    else:
        recommendation = outstanding_amount * 0.85

    debt_stress = "Low"

    if emi_ratio > 60:
        debt_stress = "High"

    elif emi_ratio > 40:
        debt_stress = "Medium"

    return {
        "recommended_settlement": round(recommendation, 2),
        "settlement_percentage": round(
            recommendation / outstanding_amount * 100,
            2,
        ),
        "emi_ratio": round(emi_ratio, 2),
        "debt_stress": debt_stress,
        "overdue_months": overdue_months,
    }