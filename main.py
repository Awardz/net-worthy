from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

app = FastAPI()
@app.get("/")
def read_root():
    return {"Hello": "World"}
    