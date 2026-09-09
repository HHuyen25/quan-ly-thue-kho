from datetime import date
from typing import Optional

from ..models.enums import AreaType, RequestStatus
from ..models.rental_request import RentalRequest
from .common import CamelModel


class RentalRequestRead(CamelModel):
    id: str
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
    status: RequestStatus
    note: Optional[str] = None

    @classmethod
    def from_doc(cls, doc: RentalRequest) -> "RentalRequestRead":
        return cls(id=str(doc.id), **doc.model_dump(exclude={"id"}))


class RentalRequestCreate(CamelModel):
    customer_name: str
    phone: str
    email: str
    requested_m2: float
    preferred_type: AreaType
    start_date: date
    end_date: date
    special_request: Optional[str] = None


class RentalRequestReview(CamelModel):
    note: Optional[str] = None
