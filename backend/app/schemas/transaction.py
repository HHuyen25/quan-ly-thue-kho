from datetime import date
from typing import Optional

from ..models.enums import TransactionStatus, TransactionType
from ..models.transaction import Transaction
from .common import CamelModel


class TransactionRead(CamelModel):
    id: str
    date: date
    type: TransactionType
    category: str
    customer_id: Optional[str] = None
    contract_id: Optional[str] = None
    invoice_id: Optional[str] = None
    amount: float
    method: str
    content: str
    status: TransactionStatus

    @classmethod
    def from_doc(cls, doc: Transaction) -> "TransactionRead":
        return cls(id=str(doc.id), **doc.model_dump(exclude={"id"}))


class TransactionCreate(CamelModel):
    date: date
    type: TransactionType
    category: str
    customer_id: Optional[str] = None
    contract_id: Optional[str] = None
    invoice_id: Optional[str] = None
    amount: float
    method: str
    content: str
