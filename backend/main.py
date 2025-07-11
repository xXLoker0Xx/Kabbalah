from fastapi import FastAPI
from routers import letters, gematria, transcribe

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="KabbalaCode API")

app.include_router(letters.router)
app.include_router(gematria.router)
app.include_router(transcribe.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # O especifica ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)