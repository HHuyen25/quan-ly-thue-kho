from datetime import date
from typing import Optional

from ..models.enums import PaymentStatus
from ..models.invoice import Invoice
from .common import CamelModel


class InvoiceRead(CamelModel):
    id: str
    number: str
    date: date
    customer_id: str
    contract_id: str
    period: str
    content: str
    amount_before_tax: float
    vat: float
    total: float
    due_date: date
    status: PaymentStatus
    paid_amount: float

    @classmethod
    def from_doc(cls, doc: Invoice) -> "InvoiceRead":
        return cls(id=str(doc.id), **doc.model_dump(exclude={"id"}))


class InvoiceCreate(CamelModel):
    contract_id: str
    period: str
    content: Optional[str] = None
    date: Optional[date] = None
    due_date: Optional[date] = None


class PaymentCreate(CamelModel):
    amount: float
    method: str
