from fastapi import APIRouter
from pydantic import BaseModel
from core.interpreter import execute_script, load_letters
from fastapi import HTTPException

router = APIRouter()

@router.get("/letters")
def get_letters():
    return load_letters()


@router.get("/letters/{symbol}")
def get_letter_by_symbol(symbol: str):
    letters = load_letters()
    letter = next((l for l in letters if l["symbol"] == symbol), None)
    if letter:
        return letter
    raise HTTPException(status_code=404, detail=f"Letra '{symbol}' no encontrada.")

class ScriptRequest(BaseModel):
    symbols: list[str]

@router.post("/interpret")
def interpret_script(req: ScriptRequest):
    result = execute_script(req.symbols)
    return {"interpretation": result}
