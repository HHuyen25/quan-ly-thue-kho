from typing import List

from fastapi import APIRouter, Depends, HTTPException, status

from ..deps import require_roles
from ..models.user import User
from ..schemas.user import UserCreate, UserRead, UserUpdate
from ..security import hash_password

router = APIRouter(dependencies=[Depends(require_roles("admin"))])


@router.get("", response_model=List[UserRead])
async def list_users() -> List[UserRead]:
    users = await User.find_all().to_list()
    return [UserRead.from_doc(user) for user in users]


@router.post("", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def create_user(payload: UserCreate) -> UserRead:
    existing = await User.find_one(User.username == payload.username)
    if existing is not None:
        raise HTTPException(status_code=400, detail="Tên đăng nhập đã tồn tại")

    user = User(
        username=payload.username,
        password_hash=hash_password(payload.password),
        name=payload.name,
        role=payload.role,
        email=payload.email,
        phone=payload.phone,
        customer_id=payload.customer_id,
    )
    await user.insert()
    return UserRead.from_doc(user)


@router.patch("/{user_id}", response_model=UserRead)
async def update_user(user_id: str, payload: UserUpdate) -> UserRead:
    user = await User.get(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Không tìm thấy người dùng")

    data = payload.model_dump(exclude_unset=True)
    password = data.pop("password", None)
    for field, value in data.items():
        setattr(user, field, value)
    if password:
        user.password_hash = hash_password(password)
    await user.save()
    return UserRead.from_doc(user)


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: str) -> None:
    user = await User.get(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Không tìm thấy người dùng")
    await user.delete()
