from typing import Optional

from ..models.customer import Customer
from ..models.enums import CustomerStatus, CustomerType
from .common import CamelModel


class CustomerRead(CamelModel):
    id: str
    code: str
    name: str
    type: CustomerType
    phone: str
    email: str
    tax_code: Optional[str] = None
    address: Optional[str] = None
    rented_m2: float
    debt: float
    status: CustomerStatus

    @classmethod
    def from_doc(cls, doc: Customer) -> "CustomerRead":
        return cls(
            id=str(doc.id),
            code=doc.code,
            name=doc.name,
            type=doc.type,
            phone=doc.phone,
            email=doc.email,
            tax_code=doc.tax_code,
            address=doc.address,
            rented_m2=doc.rented_m2,
            debt=doc.debt,
            status=doc.status,
        )


class CustomerCreate(CamelModel):
    name: str
    type: CustomerType
    phone: str
    email: str
    tax_code: Optional[str] = None
    address: Optional[str] = None


class CustomerUpdate(CamelModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    tax_code: Optional[str] = None
    address: Optional[str] = None
    status: Optional[CustomerStatus] = None
