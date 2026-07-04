from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.health import router as health_router
from app.core.config import settings
from app.schemas.envelope import APIError, APIResponse


def create_app() -> FastAPI:
    application = FastAPI(title="DM Co-Pilot V2", version=settings.version)
    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    application.include_router(health_router)

    @application.exception_handler(HTTPException)
    async def http_exception_handler(_request: Request, exc: HTTPException) -> JSONResponse:
        payload = APIResponse[None](error=APIError(code=str(exc.status_code), message=str(exc.detail)))
        return JSONResponse(status_code=exc.status_code, content=payload.model_dump())

    return application


app = create_app()
