from datetime import date, timedelta

from ..models.contract import Contract
from ..models.invoice import Invoice
from ..schemas.invoice import InvoiceCreate

VAT_RATE = 0.10
DEFAULT_DUE_DAYS = 5


async def generate_invoice(payload: InvoiceCreate) -> Invoice:
    contract = await Contract.get(payload.contract_id)
    if contract is None:
        raise ValueError("Hợp đồng không tồn tại")
    if contract.status not in ("DangHieuLuc", "SapHetHan"):
        raise ValueError("Chỉ lập hóa đơn cho hợp đồng đang hiệu lực hoặc sắp hết hạn")

    invoice_date = payload.date or date.today()
    due_date = payload.due_date or invoice_date + timedelta(days=DEFAULT_DUE_DAYS)
    content = payload.content or f"Tiền thuê {payload.period}"

    amount_before_tax = contract.monthly_rent + contract.service_fee
    vat = round(amount_before_tax * VAT_RATE)
    total = amount_before_tax + vat

    count = await Invoice.find_all().count()
    number = f"HD-{invoice_date.year}-{count + 1:03d}"

    invoice = Invoice(
        number=number,
        date=invoice_date,
        customer_id=contract.customer_id,
        contract_id=payload.contract_id,
        period=payload.period,
        content=content,
        amount_before_tax=amount_before_tax,
        vat=vat,
        total=total,
        due_date=due_date,
        status="ChuaThanhToan",
        paid_amount=0,
    )
    await invoice.insert()
    return invoice
