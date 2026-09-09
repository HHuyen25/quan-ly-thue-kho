from .common import CamelModel


class RevenuePoint(CamelModel):
    month: str
    revenue: float


class FillRatePoint(CamelModel):
    month: str
    total: float
    rented: float
    rate: float


class DebtRow(CamelModel):
    customer_id: str
    customer_name: str
    total_receivable: float
    paid: float
    remaining: float
    overdue: float
    rate: float
    status: str


class CashFlowSummary(CamelModel):
    total_income: float
    total_expense: float
    balance: float


class TaxReport(CamelModel):
    period_from: str
    period_to: str
    revenue: float
    vat_output: float
    deductible_expense: float
    taxable_income: float
    cit_provisional: float
