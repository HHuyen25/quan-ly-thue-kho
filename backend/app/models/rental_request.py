from datetime import date
from typing import Optional

from beanie import Document
from pymongo import ASCENDING, IndexModel

from .enums import AreaType, RequestStatus


class RentalRequest(Document):
    code: str
    customer_name: str
    phone: str
    email: str
    requested_m2: float
    preferred_type: AreaType
    start_date: date
    end_date: date
    special_request: Optional[str] = None
    date: date
    status: RequestStatus = "Moi"
    note: Optional[str] = None

    class Settings:
        name = "rental_requests"
        indexes = [IndexModel([("code", ASCENDING)], unique=True)]
