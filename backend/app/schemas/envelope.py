from typing import Any, Generic, TypeVar

from pydantic import BaseModel, Field

T = TypeVar("T")


class APIError(BaseModel):
    code: str
    message: str


class APIResponse(BaseModel, Generic[T]):
    data: T | None = None
    error: APIError | None = None
    meta: dict[str, Any] = Field(default_factory=dict)
