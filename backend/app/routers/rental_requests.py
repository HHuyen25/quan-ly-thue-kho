from datetime import date
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status

from ..deps import require_roles
from ..models.rental_request import RentalRequest
from ..schemas.rental_request import RentalRequestCreate, RentalRequestRead, RentalRequestReview

router = APIRouter()


def _generate_code(sequence: int) -> str:
    return f"YC{sequence:03d}"


@router.get(
    "",
    response_model=List[RentalRequestRead],
    dependencies=[Depends(require_roles("admin", "staff"))],
)
async def list_rental_requests() -> List[RentalRequestRead]:
    requests = await RentalRequest.find_all().to_list()
    return [RentalRequestRead.from_doc(item) for item in requests]


@router.post("", response_model=RentalRequestRead, status_code=status.HTTP_201_CREATED)
async def create_rental_request(payload: RentalRequestCreate) -> RentalRequestRead:
    count = await RentalRequest.find_all().count()
    request = RentalRequest(
        code=_generate_code(count + 1),
        date=date.today(),
        status="Moi",
        **payload.model_dump(),
    )
    await request.insert()
    return RentalRequestRead.from_doc(request)


@router.post(
    "/{request_id}/accept",
    response_model=RentalRequestRead,
    dependencies=[Depends(require_roles("admin", "staff"))],
)
async def accept_rental_request(request_id: str) -> RentalRequestRead:
    request = await RentalRequest.get(request_id)
    if request is None:
        raise HTTPException(status_code=404, detail="Không tìm thấy yêu cầu thuê")
    if request.status != "Moi":
        raise HTTPException(status_code=400, detail="Yêu cầu đã được xử lý, không thể tiếp nhận lại")
    request.status = "DaTiepNhan"
    await request.save()
    return RentalRequestRead.from_doc(request)


@router.post(
    "/{request_id}/approve",
    response_model=RentalRequestRead,
    dependencies=[Depends(require_roles("admin"))],
)
async def approve_rental_request(request_id: str) -> RentalRequestRead:
    request = await RentalRequest.get(request_id)
    if request is None:
        raise HTTPException(status_code=404, detail="Không tìm thấy yêu cầu thuê")
    if request.status != "DaTiepNhan":
        raise HTTPException(
            status_code=400, detail="Yêu cầu phải được nhân viên kho tiếp nhận trước khi duyệt"
        )
    request.status = "DaDuyet"
    await request.save()
    return RentalRequestRead.from_doc(request)


@router.post(
    "/{request_id}/reject",
    response_model=RentalRequestRead,
    dependencies=[Depends(require_roles("admin"))],
)
async def reject_rental_request(request_id: str, payload: RentalRequestReview) -> RentalRequestRead:
    request = await RentalRequest.get(request_id)
    if request is None:
        raise HTTPException(status_code=404, detail="Không tìm thấy yêu cầu thuê")
    if request.status != "DaTiepNhan":
        raise HTTPException(
            status_code=400, detail="Yêu cầu phải được nhân viên kho tiếp nhận trước khi từ chối"
        )
    request.status = "TuChoi"
    request.note = payload.note
    await request.save()
    return RentalRequestRead.from_doc(request)
