from collections import defaultdict
from datetime import date
from typing import List

from ..models.area import Area
from ..models.customer import Customer
from ..models.invoice import Invoice
from ..models.transaction import Transaction
from ..schemas.report import CashFlowSummary, DebtRow, FillRatePoint, RevenuePoint, TaxReport

CIT_RATE = 0.20


async def revenue_by_month() -> List[RevenuePoint]:
    invoices = await Invoice.find_all().to_list()
    totals: dict[str, float] = defaultdict(float)
    for invoice in invoices:
        key = invoice.date.strftime("%Y-%m")
        totals[key] += invoice.total
    return [RevenuePoint(month=key, revenue=value) for key, value in sorted(totals.items())]


async def fill_rate() -> FillRatePoint:
    areas = await Area.find_all().to_list()
    total = sum(area.area_m2 for area in areas)
    rented = sum(area.area_m2 for area in areas if area.status == "DaThue")
    rate = round((rented / total) * 100, 2) if total else 0.0
    return FillRatePoint(month=date.today().strftime("%Y-%m"), total=total, rented=rented, rate=rate)


async def debt_report() -> List[DebtRow]:
    customers = await Customer.find_all().to_list()
    invoices = await Invoice.find_all().to_list()
    rows: List[DebtRow] = []
    for customer in customers:
        customer_invoices = [i for i in invoices if i.customer_id == str(customer.id)]
        total_receivable = sum(i.total for i in customer_invoices)
        paid = sum(i.paid_amount for i in customer_invoices)
        remaining = total_receivable - paid
        overdue = sum(
            i.total - i.paid_amount for i in customer_invoices if i.status == "QuaHan"
        )
        rate = round((paid / total_receivable) * 100, 2) if total_receivable else 100.0
        if overdue > 0:
            status = "QuaHan"
        elif remaining <= 0:
            status = "DaThanhToan"
        elif paid > 0:
            status = "ThanhToanMotPhan"
        else:
            status = "ChuaThanhToan"
        rows.append(
            DebtRow(
                customer_id=str(customer.id),
                customer_name=customer.name,
                total_receivable=total_receivable,
                paid=paid,
                remaining=remaining,
                overdue=overdue,
                rate=rate,
                status=status,
            )
        )
    return rows


async def tax_report(from_date: date, to_date: date) -> TaxReport:
    invoices = await Invoice.find_all().to_list()
    period_invoices = [i for i in invoices if from_date <= i.date <= to_date]
    revenue = sum(i.amount_before_tax for i in period_invoices)
    vat_output = sum(i.vat for i in period_invoices)

    transactions = await Transaction.find_all().to_list()
    deductible_expense = sum(
        t.amount
        for t in transactions
        if t.type == "Chi" and t.status == "XacNhan" and from_date <= t.date <= to_date
    )

    taxable_income = revenue - deductible_expense
    cit_provisional = round(taxable_income * CIT_RATE) if taxable_income > 0 else 0.0

    return TaxReport(
        period_from=from_date.isoformat(),
        period_to=to_date.isoformat(),
        revenue=revenue,
        vat_output=vat_output,
        deductible_expense=deductible_expense,
        taxable_income=taxable_income,
        cit_provisional=cit_provisional,
    )


async def cash_flow_summary(from_date: date, to_date: date) -> CashFlowSummary:
    transactions = await Transaction.find_all().to_list()
    income = sum(
        t.amount
        for t in transactions
        if t.type == "Thu" and t.status == "XacNhan" and from_date <= t.date <= to_date
    )
    expense = sum(
        t.amount
        for t in transactions
        if t.type == "Chi" and t.status == "XacNhan" and from_date <= t.date <= to_date
    )
    return CashFlowSummary(total_income=income, total_expense=expense, balance=income - expense)
