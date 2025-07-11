import json
from pathlib import Path


def interpret_symbol(symbol: str) -> str:
    if symbol == "א":
        return "Inicia el ciclo. Alef representa el potencial puro antes de toda manifestación."
    return f"No hay una interpretación definida aún para el símbolo '{symbol}'."

def load_letters():
    path = Path(__file__).parent.parent / "data" / "letters.json"
    with open(path, encoding="utf-8") as f:
        return json.load(f)

def execute_script(script: list[str]) -> list[str]:
    letters = load_letters()
    interpretations = []
    for symbol in script:
        match = next((l for l in letters if l["symbol"] == symbol), None)
        if match:
            interpretations.append(f"{symbol} ({match['name']}): {match['action']}")
        else:
            interpretations.append(f"{symbol}: No se encontró interpretación")
    return interpretations