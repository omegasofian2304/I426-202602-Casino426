"""
Author : Sofian Hussein
Date : 10.03.2026
Project : Casino426
Description: Store the money
"""
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.logic.manage_profile import hash_and_save
from app.logic.manage_profile import verify_login
from app.logic.manage_profile import show_top
from email_validator import validate_email, EmailNotValidError
from app.logic.manage_profile import add_money_data

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
origins = [
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/login")
def login(username: str, password: str):
    if not verify_login(username, password):
        raise HTTPException(401, "Identifiants not valid")
    return {"msg": "Connected"}


@app.post("/register")
def register_user(username: str, password: str, email: str):
    # Source Claude
    # Prompt : Give me an email-validator library in python
    try:
        validate_email(email)
        if not hash_and_save(username, password, email):
            raise HTTPException(401, "Identifiants not valid")
        return {"msg": "Created"}
    except EmailNotValidError as e:
        raise HTTPException(400, "Email invalide")


@app.get("/leaderboard")
def get_leaderboard():
    leaderboard = show_top()
    return leaderboard

@app.get("/add-money")
def add_money():
    return add_money_data()