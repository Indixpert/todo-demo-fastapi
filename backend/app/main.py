from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models, api
from .database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Todo API")

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api.router, prefix="/api", tags=["todos"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI Todo Backend"}