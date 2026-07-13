from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from datetime import date
import os


def generate_settlement_letter(data):
    os.makedirs("generated", exist_ok=True)

    filename = "generated/Settlement_Letter.pdf"

    doc = SimpleDocTemplate(filename)
    styles = getSampleStyleSheet()

    story = []

    # Title
    story.append(
        Paragraph(
            "<font size=20><b>Debt Settlement Request Letter</b></font>",
            styles["Title"],
        )
    )

    story.append(Spacer(1, 20))

    # Date
    story.append(
        Paragraph(f"<b>Date:</b> {date.today()}", styles["Normal"])
    )

    story.append(Spacer(1, 20))

    # To
    story.append(Paragraph("<b>To,</b>", styles["Normal"]))
    story.append(
        Paragraph(f"{data['lender_name']} Recovery Department", styles["Normal"])
    )

    story.append(Spacer(1, 20))

    # Subject
    story.append(
        Paragraph(
            f"<b>Subject:</b> Request for Full & Final Settlement of {data['loan_type']}",
            styles["Normal"],
        )
    )

    story.append(Spacer(1, 20))

    # Greeting
    story.append(Paragraph("Respected Sir/Madam,", styles["Normal"]))

    story.append(Spacer(1, 10))

    # Body
    body = f"""
I am writing this letter to request a One-Time Settlement of my loan.<br/><br/>

<b>Loan Details</b><br/><br/>

• Loan Type: {data['loan_type']}<br/>
• Outstanding Amount: Rs.{data['outstanding_amount']:,.2f}<br/>
• Monthly Income: Rs.{data['monthly_income']:,.2f}<br/>
• Overdue Months: {data['overdue_months']}<br/><br/>

Due to unavoidable financial hardship, I have been unable to continue my regular EMI payments.<br/><br/>

I sincerely request your bank to consider my case for a Full & Final Settlement.<br/><br/>

I assure you that I will make the agreed payment immediately after settlement approval.<br/><br/>

Thank you for your understanding.
"""

    story.append(Paragraph(body, styles["BodyText"]))

    story.append(Spacer(1, 30))

    # Closing
    story.append(Paragraph("Yours Faithfully,", styles["Normal"]))

    story.append(Spacer(1, 40))

    story.append(Paragraph("__________________________", styles["Normal"]))
    story.append(Paragraph("Customer", styles["Normal"]))

    doc.build(story)

    return filename