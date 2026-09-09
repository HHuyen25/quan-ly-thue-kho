from typing import List

from fastapi import APIRouter, Depends, HTTPException, status

from ..deps import require_roles
from ..models.area import Area, AreaMapPos
from ..schemas.area import AreaCreate, AreaRead, AreaUpdate

router = APIRouter()


@router.get("", response_model=List[AreaRead])
async def list_areas() -> List[AreaRead]:
    areas = await Area.find_all().to_list()
    return [AreaRead.from_doc(area) for area in areas]


@router.get("/{area_id}", response_model=AreaRead)
async def get_area(area_id: str) -> AreaRead:
    area = await Area.get(area_id)
    if area is None:
        raise HTTPException(status_code=404, detail="Không tìm thấy khu vực")
    return AreaRead.from_doc(area)


@router.post(
    "",
    response_model=AreaRead,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_roles("admin", "staff"))],
)
async def create_area(payload: AreaCreate) -> AreaRead:
    count = await Area.find_all().count()
    code = f"KV-{count + 1:03d}"

    map_pos = (
        AreaMapPos(**payload.map.model_dump())
        if payload.map is not None
        else AreaMapPos(floor=1, row=9, col=10, row_span=1, col_span=3)
    )
    area = Area(
        code=code,
        name=payload.name,
        area_m2=payload.area_m2,
        type=payload.type,
        status=payload.status,
        location=payload.location,
        note=payload.note,
        map=map_pos,
    )
    await area.insert()
    return AreaRead.from_doc(area)


@router.patch(
    "/{area_id}",
    response_model=AreaRead,
    dependencies=[Depends(require_roles("admin", "staff"))],
)
async def update_area(area_id: str, payload: AreaUpdate) -> AreaRead:
    area = await Area.get(area_id)
    if area is None:
        raise HTTPException(status_code=404, detail="Không tìm thấy khu vực")

    data = payload.model_dump(exclude_unset=True)
    map_data = data.pop("map", None)
    for field, value in data.items():
        setattr(area, field, value)
    if map_data:
        area.map = AreaMapPos(**map_data)
    await area.save()
    return AreaRead.from_doc(area)


@router.delete(
    "/{area_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_roles("admin"))],
)
async def delete_area(area_id: str) -> None:
    area = await Area.get(area_id)
    if area is None:
        raise HTTPException(status_code=404, detail="Không tìm thấy khu vực")
    await area.delete()
