from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import BankAccount, Base, User
from dotenv import load_dotenv
import os

load_dotenv()
engine = create_engine(os.getenv('DATABASE_URL'))
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def seed_data():
    # Create a new session
    db = SessionLocal()
    
    test_user = User(
        email="test@example.com",
        password_hash="hashed_password"
    )

    db.add(test_user)
    db.commit()

    test_account = BankAccount(
        user_id=test_user.id,
        plaid_access_token="test_token",
        account_id="test_account_id",
        name="Test Account",
        balance=1000.00
        )
    db.add(test_account)
    db.commit()

    print("Seed data added successfully.")

if __name__ == "__main__":
    seed_data()