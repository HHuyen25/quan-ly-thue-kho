from datetime import date

from beanie import Document
from pymongo import ASCENDING, IndexModel

from .enums import PaymentStatus


class Invoice(Document):
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
    status: PaymentStatus = "ChuaThanhToan"
    paid_amount: float = 0

    class Settings:
        name = "invoices"
        indexes = [IndexModel([("number", ASCENDING)], unique=True)]
