from datetime import date

from ..models.customer import Customer
from ..models.invoice import Invoice
from ..models.transaction import Transaction


async def record_payment(invoice: Invoice, amount: float, method: str) -> Invoice:
    if amount <= 0:
        raise ValueError("Số tiền thanh toán phải lớn hơn 0")

    invoice.paid_amount += amount
    if invoice.paid_amount >= invoice.total:
        invoice.status = "DaThanhToan"
    else:
        invoice.status = "ThanhToanMotPhan"
    await invoice.save()

    transaction = Transaction(
        date=date.today(),
        type="Thu",
        category="TienThue",
        customer_id=invoice.customer_id,
        contract_id=invoice.contract_id,
        invoice_id=str(invoice.id),
        amount=amount,
        method=method,
        content=f"Thu tiền hóa đơn {invoice.number}",
        status="XacNhan",
    )
    await transaction.insert()

    await recalculate_customer_debt(invoice.customer_id)
    return invoice


async def recalculate_customer_debt(customer_id: str) -> None:
    customer = await Customer.get(customer_id)
    if customer is None:
        return

    invoices = await Invoice.find(Invoice.customer_id == customer_id).to_list()
    debt = sum(
        invoice.total - invoice.paid_amount
        for invoice in invoices
        if invoice.status != "DaThanhToan"
    )
    customer.debt = debt
    await customer.save()


async def mark_overdue_invoices() -> int:
    today = date.today()
    invoices = await Invoice.find_all().to_list()
    count = 0
    for invoice in invoices:
        if invoice.status in ("ChuaThanhToan", "ThanhToanMotPhan") and invoice.due_date < today:
            invoice.status = "QuaHan"
            await invoice.save()
            count += 1
    return count
