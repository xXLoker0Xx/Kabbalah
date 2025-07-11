# routers/gematria.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from core.interpreter import load_letters

router = APIRouter()
letters_list = load_letters()
letters_map = {letter["symbol"]: letter for letter in letters_list}


class WordRequest(BaseModel):
    word: str

@router.post("/gematria")
def calculate_gematria(request: WordRequest):
    total = 0
    breakdown = []
    
    for char in request.word:
        if char not in letters_map and char != " ":
            raise HTTPException(status_code=400, detail=f"Letra no reconocida: {char}")
        if char != " ":
            letter_info = letters_map[char]
            total += letter_info["value"]
            breakdown.append(letter_info)

    return {
        "word": request.word,
        "gematria": total,
        "letters": breakdown
    }
