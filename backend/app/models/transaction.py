from datetime import date
from typing import Optional

from beanie import Document

from .enums import TransactionStatus, TransactionType


class Transaction(Document):
    date: date
    type: TransactionType
    category: str
    customer_id: Optional[str] = None
    contract_id: Optional[str] = None
    invoice_id: Optional[str] = None
    amount: float
    method: str
    content: str
    status: TransactionStatus = "XacNhan"

    class Settings:
        name = "transactions"
