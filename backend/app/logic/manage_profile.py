""""
Author : Sofian Hussein
Date : 11.03.2026
Project : Casino426
Description: Hash and verify the password
"""
import bcrypt
import json
from pathlib import Path

# Source Claude
# Prompt : How to use the library bcrypt

DATA_FILE = Path(__file__).parent.parent.parent / "data" / "leaderboard.json"

def hash_and_save(username: str, password: str, email: str) -> bool:
    with open(DATA_FILE, "r") as f:
        users = json.load(f)

    for user in users:
        if user["username"] == username:
            return False  # username déjà pris

    hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    users.append({
        "username": username,
        "solde": 100,
        "password": hashed.decode("utf-8"),
        "email": email
    })
    with open(DATA_FILE, "w") as f:
        json.dump(users, f, indent=2)

    return True


def verify_login(username: str, password: str) -> bool:
    with open(DATA_FILE, "r") as f:
        users = json.load(f)

    for user in users:
        if user["username"] == username:
            return bcrypt.checkpw(password.encode("utf-8"), user["password"].encode("utf-8"))

    return False


def show_top():
    with open(DATA_FILE, "r") as f:
        users = json.load(f)
    users_subset = [{"username": item["username"], "solde": item["solde"]} for item in users]

    sorted_users = sorted(users_subset, key=lambda user: user["solde"], reverse=True)
    users_limited = sorted_users[:10]

    return users_limited

def add_money_data():
    with open(DATA_FILE, "r") as f:
        data = json.load(f)

    for user in data:
        if user["username"] == "test":
            user["solde"] += 100
            break

    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)


