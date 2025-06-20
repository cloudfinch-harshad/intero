from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

app = FastAPI(
    title="Intero API",
    description="FastAPI backend for the Intero monorepo",
    version="0.1.0",
)

# Configure CORS to allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Welcome to the Intero API"}


@app.get("/api/hello")
async def hello():
    return {"message": "Hello from FastAPI!"}


class Item(BaseModel):
    name: str
    description: str = None


@app.post("/api/items")
async def create_item(item: Item):
    return {"id": "1", **item.model_dump()}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
    
