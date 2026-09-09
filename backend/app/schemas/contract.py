from datetime import date
from typing import Optional

from ..models.contract import Contract
from ..models.enums import ContractStatus, PaymentCycle
from .common import CamelModel


class ContractRead(CamelModel):
    id: str
    code: str
    customer_id: str
    area_id: str
    area_m2: float
    start_date: date
    end_date: date
    unit_price: float
    monthly_rent: float
    service_fee: float
    deposit: float
    payment_cycle: PaymentCycle
    status: ContractStatus
    note: Optional[str] = None

    @classmethod
    def from_doc(cls, doc: Contract) -> "ContractRead":
        return cls(id=str(doc.id), **doc.model_dump(exclude={"id"}))


class ContractCreate(CamelModel):
    customer_id: str
    area_id: str
    start_date: date
    end_date: date
    service_fee: float = 0
    deposit: float = 0
    payment_cycle: PaymentCycle
    note: Optional[str] = None


class ContractUpdate(CamelModel):
    end_date: Optional[date] = None
    unit_price: Optional[float] = None
    service_fee: Optional[float] = None
    deposit: Optional[float] = None
    payment_cycle: Optional[PaymentCycle] = None
    status: Optional[ContractStatus] = None
    note: Optional[str] = None
