from typing import Optional

from ..models.enums import Role
from ..models.user import User
from .common import CamelModel


class UserRead(CamelModel):
    id: str
    username: str
    name: str
    role: Role
    email: Optional[str] = None
    phone: Optional[str] = None
    customer_id: Optional[str] = None

    @classmethod
    def from_doc(cls, doc: User) -> "UserRead":
        return cls(
            id=str(doc.id),
            username=doc.username,
            name=doc.name,
            role=doc.role,
            email=doc.email,
            phone=doc.phone,
            customer_id=doc.customer_id,
        )


class UserCreate(CamelModel):
    username: str
    password: str
    name: str
    role: Role
    email: Optional[str] = None
    phone: Optional[str] = None
    customer_id: Optional[str] = None


class UserUpdate(CamelModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    password: Optional[str] = None
