from beanie import init_beanie
from pymongo import AsyncMongoClient
from pymongo.errors import ServerSelectionTimeoutError

from .config import settings
from .models.area import Area
from .models.contract import Contract
from .models.customer import Customer
from .models.inspection import Inspection
from .models.invoice import Invoice
from .models.price import PriceRow
from .models.rental_request import RentalRequest
from .models.transaction import Transaction
from .models.user import User

DOCUMENT_MODELS = [
    User,
    Area,
    Customer,
    Contract,
    Invoice,
    Transaction,
    RentalRequest,
    PriceRow,
    Inspection,
]

client: AsyncMongoClient | None = None


def create_mongo_client() -> AsyncMongoClient:
    """Create one native async PyMongo client for a local or remote MongoDB."""
    return AsyncMongoClient(
        settings.mongo_uri,
        serverSelectionTimeoutMS=settings.mongo_server_selection_timeout_ms,
    )


async def init_db() -> None:
    global client
    if client is not None:
        return

    client = create_mongo_client()
    try:
        await client.admin.command({"ping": 1})
        database = client[settings.mongo_db]
        collection_names = await database.list_collection_names()
        # Rename the account collection without recreating its data or indexes.
        if "account" not in collection_names:
            for old_name in ("acc", "users"):
                if old_name in collection_names:
                    await database[old_name].rename("account")
                    break
        await init_beanie(
            database=database, document_models=DOCUMENT_MODELS
        )
    except ServerSelectionTimeoutError as exc:
        await client.close()
        client = None
        raise RuntimeError(
            "Không thể kết nối MongoDB tại "
            f"{settings.mongo_uri}. Hãy khởi động dịch vụ MongoDB."
        ) from exc


async def close_db() -> None:
    """Close the shared database client during FastAPI shutdown."""
    global client
    if client is not None:
        await client.close()
        client = None
