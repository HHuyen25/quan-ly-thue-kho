from typing import Optional

from ..models.area import Area
from ..models.enums import AreaStatus, AreaType
from .common import CamelModel


class AreaMapPosSchema(CamelModel):
    floor: int
    row: int
    col: int
    row_span: Optional[int] = None
    col_span: Optional[int] = None


class AreaRead(CamelModel):
    id: str
    code: str
    name: str
    area_m2: float
    type: AreaType
    status: AreaStatus
    location: str
    note: Optional[str] = None
    map: AreaMapPosSchema

    @classmethod
    def from_doc(cls, doc: Area) -> "AreaRead":
        return cls(
            id=str(doc.id),
            code=doc.code,
            name=doc.name,
            area_m2=doc.area_m2,
            type=doc.type,
            status=doc.status,
            location=doc.location,
            note=doc.note,
            map=AreaMapPosSchema(**doc.map.model_dump()),
        )


class AreaCreate(CamelModel):
    name: str
    area_m2: float
    type: AreaType
    status: AreaStatus = "Trong"
    location: str
    note: Optional[str] = None
    map: Optional[AreaMapPosSchema] = None


class AreaUpdate(CamelModel):
    name: Optional[str] = None
    area_m2: Optional[float] = None
    type: Optional[AreaType] = None
    status: Optional[AreaStatus] = None
    location: Optional[str] = None
    note: Optional[str] = None
    map: Optional[AreaMapPosSchema] = None
