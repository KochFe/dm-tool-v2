from collections.abc import AsyncIterator

from httpx import AsyncClient
from sqlalchemy.exc import OperationalError

from app.core.db import get_session
from app.main import app


async def test_health_ok(client: AsyncClient) -> None:
    resp = await client.get("/health")
    assert resp.status_code == 200
    body = resp.json()
    assert body["data"] == {"status": "ok", "database": "ok"}
    assert body["error"] is None
    assert body["meta"]["version"] == "0.1.0"


async def test_health_db_down(client: AsyncClient) -> None:
    class BrokenSession:
        async def execute(self, *args: object, **kwargs: object) -> None:
            raise OperationalError("SELECT 1", {}, Exception("db down"))

    async def _broken() -> AsyncIterator[BrokenSession]:
        yield BrokenSession()

    app.dependency_overrides[get_session] = _broken
    resp = await client.get("/health")
    assert resp.status_code == 503
    body = resp.json()
    assert body["data"] == {"status": "degraded", "database": "error"}
    assert body["error"] is None
