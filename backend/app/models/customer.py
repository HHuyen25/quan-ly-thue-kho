from typing import Optional

from beanie import Document
from pymongo import ASCENDING, IndexModel

from .enums import CustomerStatus, CustomerType


class Customer(Document):
    code: str
    name: str
    type: CustomerType
    phone: str
    email: str
    tax_code: Optional[str] = None
    address: Optional[str] = None
    rented_m2: float = 0
    debt: float = 0
    status: CustomerStatus = "NgungThue"

    class Settings:
        name = "customers"
        indexes = [IndexModel([("code", ASCENDING)], unique=True)]
