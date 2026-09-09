from ..models.area import Area
from ..models.contract import Contract
from ..models.price import PriceRow
from ..schemas.contract import ContractCreate


async def create_contract(payload: ContractCreate) -> Contract:
    area = await Area.get(payload.area_id)
    if area is None:
        raise ValueError("Khu vực không tồn tại")
    if area.status != "Trong":
        raise ValueError("Khu vực không còn trống, không thể tạo hợp đồng mới")

    price_row = await PriceRow.find_one(PriceRow.type == area.type, PriceRow.status == "DangApDung")
    if price_row is None:
        raise ValueError(f"Chưa có bảng giá đang áp dụng cho loại khu vực {area.type}")

    count = await Contract.find_all().count()
    code = f"HD{count + 1:03d}"

    unit_price = price_row.unit_price
    monthly_rent = area.area_m2 * unit_price
    contract = Contract(
        code=code,
        customer_id=payload.customer_id,
        area_id=payload.area_id,
        area_m2=area.area_m2,
        start_date=payload.start_date,
        end_date=payload.end_date,
        unit_price=unit_price,
        monthly_rent=monthly_rent,
        service_fee=payload.service_fee,
        deposit=payload.deposit,
        payment_cycle=payload.payment_cycle,
        status="DangHieuLuc",
        note=payload.note,
    )
    await contract.insert()

    area.status = "DaThue"
    await area.save()
    return contract


async def terminate_contract(contract: Contract) -> Contract:
    contract.status = "DaKetThuc"
    await contract.save()

    area = await Area.get(contract.area_id)
    if area is not None:
        area.status = "Trong"
        await area.save()
    return contract
