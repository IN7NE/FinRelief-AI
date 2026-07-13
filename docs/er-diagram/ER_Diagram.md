# Entity Relationship Diagram

## Entities

### User

- id
- name
- email
- password

---

### Loan

- id
- user_id
- bank_name
- loan_type
- outstanding_amount
- emi
- monthly_income
- overdue_months

---

### SettlementHistory

- id
- loan_id
- settlement_percentage
- recommended_amount
- created_at

---

### NegotiationHistory

- id
- loan_id
- prompt
- generated_letter
- created_at

---

## Relationships

User (1)

↓

Loan (Many)

↓

SettlementHistory (Many)

↓

NegotiationHistory (Many)