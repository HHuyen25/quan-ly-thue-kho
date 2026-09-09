from typing import List

from fastapi import APIRouter, Depends, HTTPException, status

from ..deps import require_roles
from ..models.price import PriceRow
from ..schemas.price import PriceCreate, PriceRead, PriceUpdate

router = APIRouter()


@router.get("", response_model=List[PriceRead])
async def list_prices() -> List[PriceRead]:
    prices = await PriceRow.find_all().to_list()
    return [PriceRead.from_doc(price) for price in prices]


@router.post(
    "",
    response_model=PriceRead,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_roles("admin"))],
)
async def create_price(payload: PriceCreate) -> PriceRead:
    price = PriceRow(**payload.model_dump())
    await price.insert()
    return PriceRead.from_doc(price)


@router.patch(
    "/{price_id}",
    response_model=PriceRead,
    dependencies=[Depends(require_roles("admin"))],
)
async def update_price(price_id: str, payload: PriceUpdate) -> PriceRead:
    price = await PriceRow.get(price_id)
    if price is None:
        raise HTTPException(status_code=404, detail="Không tìm thấy bảng giá")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(price, field, value)
    await price.save()
    return PriceRead.from_doc(price)
