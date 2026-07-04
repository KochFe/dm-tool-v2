from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy import text

from app.core.config import settings
from app.core.db import SessionDep
from app.schemas.envelope import APIResponse

router = APIRouter()


class HealthStatus(BaseModel):
    status: str
    database: str


@router.get("/health")
async def health(session: SessionDep) -> JSONResponse:
    try:
        await session.execute(text("SELECT 1"))
        status_code, status, database = 200, "ok", "ok"
    except Exception:
        status_code, status, database = 503, "degraded", "error"
    payload = APIResponse[HealthStatus](
        data=HealthStatus(status=status, database=database),
        meta={"version": settings.version},
    )
    return JSONResponse(status_code=status_code, content=payload.model_dump())
