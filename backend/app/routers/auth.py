from beanie.operators import Or
from fastapi import APIRouter, Depends, HTTPException, status

from ..deps import get_current_user
from ..models.user import User
from ..schemas.auth import LoginRequest, TokenResponse
from ..schemas.user import UserRead, UserUpdate
from ..security import create_access_token, hash_password, verify_password

router = APIRouter()


@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginRequest) -> TokenResponse:
    identifier = payload.username
    user = await User.find_one(
        Or(User.username == identifier, User.email == identifier, User.phone == identifier)
    )
    if user is None or not verify_password(payload.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Sai tên đăng nhập hoặc mật khẩu",
        )
    token = create_access_token(subject=str(user.id))
    return TokenResponse(access_token=token, user=UserRead.from_doc(user))


@router.get("/me", response_model=UserRead)
async def me(current_user: User = Depends(get_current_user)) -> UserRead:
    return UserRead.from_doc(current_user)


@router.patch("/me", response_model=UserRead)
async def update_me(payload: UserUpdate, current_user: User = Depends(get_current_user)) -> UserRead:
    data = payload.model_dump(exclude_unset=True)
    password = data.pop("password", None)
    for field, value in data.items():
        setattr(current_user, field, value)
    if password:
        current_user.password_hash = hash_password(password)
    await current_user.save()
    return UserRead.from_doc(current_user)
