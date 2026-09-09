from typing import List

from fastapi import APIRouter, Depends, HTTPException, status

from ..deps import require_roles
from ..models.inspection import Inspection, InspectionItem
from ..schemas.inspection import InspectionCreate, InspectionRead

router = APIRouter(dependencies=[Depends(require_roles("admin", "staff"))])


@router.get("", response_model=List[InspectionRead])
async def list_inspections() -> List[InspectionRead]:
    inspections = await Inspection.find_all().to_list()
    return [InspectionRead.from_doc(item) for item in inspections]


@router.post("", response_model=InspectionRead, status_code=status.HTTP_201_CREATED)
async def create_inspection(payload: InspectionCreate) -> InspectionRead:
    inspection = Inspection(
        month=payload.month,
        date=payload.date,
        items=[InspectionItem(**item.model_dump()) for item in payload.items],
        confirmed=False,
    )
    await inspection.insert()
    return InspectionRead.from_doc(inspection)


@router.post("/{inspection_id}/confirm", response_model=InspectionRead)
async def confirm_inspection(inspection_id: str) -> InspectionRead:
    inspection = await Inspection.get(inspection_id)
    if inspection is None:
        raise HTTPException(status_code=404, detail="Không tìm thấy biên bản kiểm kê")
    inspection.confirmed = True
    await inspection.save()
    return InspectionRead.from_doc(inspection)
