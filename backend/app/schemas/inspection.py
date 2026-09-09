from datetime import date
from typing import List

from ..models.enums import AreaStatus
from ..models.inspection import Inspection
from .common import CamelModel


class InspectionItemSchema(CamelModel):
    area_id: str
    system_status: AreaStatus
    actual_status: AreaStatus
    match: bool


class InspectionRead(CamelModel):
    id: str
    month: str
    date: date
    items: List[InspectionItemSchema]
    confirmed: bool

    @classmethod
    def from_doc(cls, doc: Inspection) -> "InspectionRead":
        return cls(id=str(doc.id), **doc.model_dump(exclude={"id"}))


class InspectionCreate(CamelModel):
    month: str
    date: date
    items: List[InspectionItemSchema]
