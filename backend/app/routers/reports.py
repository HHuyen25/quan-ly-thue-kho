from datetime import date
from typing import List

from fastapi import APIRouter, Depends, Query

from ..deps import require_roles
from ..schemas.report import CashFlowSummary, DebtRow, FillRatePoint, RevenuePoint, TaxReport
from ..services import report as report_service

router = APIRouter(dependencies=[Depends(require_roles("admin", "accountant"))])


@router.get("/revenue", response_model=List[RevenuePoint])
async def revenue_report() -> List[RevenuePoint]:
    return await report_service.revenue_by_month()


@router.get("/fill-rate", response_model=FillRatePoint)
async def fill_rate_report() -> FillRatePoint:
    return await report_service.fill_rate()


@router.get("/debt", response_model=List[DebtRow])
async def debt_report() -> List[DebtRow]:
    return await report_service.debt_report()


@router.get("/cash-flow", response_model=CashFlowSummary)
async def cash_flow_report(
    from_date: date = Query(..., alias="fromDate"),
    to_date: date = Query(..., alias="toDate"),
) -> CashFlowSummary:
    return await report_service.cash_flow_summary(from_date, to_date)


@router.get("/tax", response_model=TaxReport)
async def tax_report(
    from_date: date = Query(..., alias="fromDate"),
    to_date: date = Query(..., alias="toDate"),
) -> TaxReport:
    return await report_service.tax_report(from_date, to_date)
