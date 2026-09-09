from datetime import date
from typing import List

from beanie import Document
from pydantic import BaseModel

from .enums import AreaStatus


class InspectionItem(BaseModel):
    area_id: str
    system_status: AreaStatus
    actual_status: AreaStatus
    match: bool


class Inspection(Document):
    month: str
    date: date
    items: List[InspectionItem]
    confirmed: bool = False

    class Settings:
        name = "inspections"
