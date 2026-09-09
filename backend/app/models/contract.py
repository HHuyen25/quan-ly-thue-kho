from datetime import date
from typing import Optional

from beanie import Document
from pymongo import ASCENDING, IndexModel

from .enums import ContractStatus, PaymentCycle


class Contract(Document):
    code: str
    customer_id: str
    area_id: str
    area_m2: float
    start_date: date
    end_date: date
    unit_price: float
    monthly_rent: float
    service_fee: float = 0
    deposit: float = 0
    payment_cycle: PaymentCycle
    status: ContractStatus = "ChoHieuLuc"
    note: Optional[str] = None

    class Settings:
        name = "contracts"
        indexes = [IndexModel([("code", ASCENDING)], unique=True)]
