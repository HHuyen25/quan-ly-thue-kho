from typing import List

from fastapi import APIRouter, Depends, HTTPException, status

from ..deps import require_roles
from ..models.transaction import Transaction
from ..schemas.transaction import TransactionCreate, TransactionRead

router = APIRouter(dependencies=[Depends(require_roles("admin", "accountant"))])


@router.get("", response_model=List[TransactionRead])
async def list_transactions() -> List[TransactionRead]:
    transactions = await Transaction.find_all().to_list()
    return [TransactionRead.from_doc(transaction) for transaction in transactions]


@router.post("", response_model=TransactionRead, status_code=status.HTTP_201_CREATED)
async def create_transaction(payload: TransactionCreate) -> TransactionRead:
    transaction = Transaction(**payload.model_dump())
    await transaction.insert()
    return TransactionRead.from_doc(transaction)


@router.post("/{transaction_id}/cancel", response_model=TransactionRead)
async def cancel_transaction(transaction_id: str) -> TransactionRead:
    transaction = await Transaction.get(transaction_id)
    if transaction is None:
        raise HTTPException(status_code=404, detail="Không tìm thấy giao dịch")
    transaction.status = "Huy"
    await transaction.save()
    return TransactionRead.from_doc(transaction)
