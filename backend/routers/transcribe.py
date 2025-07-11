from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# Mapeo fonético básico (puedes mejorarlo con el tiempo)
transcription_map = {
    "a": "א", "b": "ב", "c": "ק", "d": "ד", "e": "ע", "f": "פ",
    "g": "ג", "h": "ה", "i": "י", "j": "ג׳", "k": "כ", "l": "ל",
    "m": "מ", "n": "נ", "o": "ו", "p": "פ", "q": "ק", "r": "ר",
    "s": "ס", "t": "ת", "u": "ו", "v": "ב׳", "w": "ו", "x": "קס",
    "y": "י", "z": "ז",
    " ": " ", "-": "-", "_": "_"
}

class TranscriptionRequest(BaseModel):
    text: str

@router.post("/transcribe")
def transcribe_text(req: TranscriptionRequest):
    result = ""
    for char in req.text.lower():
        result += transcription_map.get(char, "")  # omite caracteres no mapeados
    return {"original": req.text, "hebrew": result}
