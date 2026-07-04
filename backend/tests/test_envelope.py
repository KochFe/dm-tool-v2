from app.schemas.envelope import APIError, APIResponse


def test_envelope_defaults() -> None:
    resp = APIResponse[dict](data={"x": 1})
    dumped = resp.model_dump()
    assert dumped == {"data": {"x": 1}, "error": None, "meta": {}}


def test_envelope_error_shape() -> None:
    resp = APIResponse[None](error=APIError(code="404", message="not found"))
    dumped = resp.model_dump()
    assert dumped["data"] is None
    assert dumped["error"] == {"code": "404", "message": "not found"}
    assert dumped["meta"] == {}
