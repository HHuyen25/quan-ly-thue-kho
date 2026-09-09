from datetime import date

from beanie import Document

from .enums import AreaType, PriceStatus


class PriceRow(Document):
    type: AreaType
    unit_price: float
    unit: str
    effective_from: date
    status: PriceStatus = "DangApDung"

    class Settings:
        name = "prices"
