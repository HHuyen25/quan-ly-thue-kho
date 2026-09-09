from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from .models.user import User
from .security import decode_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    payload = decode_access_token(token)
    if payload is None or "sub" not in payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token không hợp lệ")
    user = await User.get(payload["sub"])
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Người dùng không tồn tại")
    return user


def require_roles(*roles: str):
    async def checker(user: User = Depends(get_current_user)) -> User:
        if user.role not in roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Không có quyền thực hiện hành động này",
            )
        return user

    return checker
