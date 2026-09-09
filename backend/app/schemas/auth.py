from .common import CamelModel
from .user import UserRead


class LoginRequest(CamelModel):
    username: str
    password: str


class TokenResponse(CamelModel):
    access_token: str
    token_type: str = "bearer"
    user: UserRead
