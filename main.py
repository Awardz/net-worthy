from fastapi import Depends, FastAPI
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from dotenv import load_dotenv
from models import BankAccount, User, UserCreate
from utils import hash_password
from plaid import Configuration, ApiClient, Environment  # Updated import
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from plaid.model.country_code import CountryCode
from plaid.model.products import Products
from plaid.api import plaid_api
from fastapi import HTTPException
import os

load_dotenv()
app = FastAPI()

# Configuration for Plaid
configuration = Configuration(
    host=Environment.Sandbox,  # Updated to use Environment from plaid
    api_key={
        'clientId': os.getenv("PLAID_CLIENT_ID"),
        'secret': os.getenv("PLAID_SECRET"),
    }
)
api_client = ApiClient(configuration)
plaid_client = plaid_api.PlaidApi(api_client)

# Rest of your code remains unchanged

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/api/bank/balance")
def get_balance(account_id: str, db: Session = Depends(get_db)):
    account = db.query(BankAccount).filter(BankAccount.account_id == account_id).first()
    if account:
        return {"balance": str(account.balance), "currency": account.currency}
    else:
        return {"error": "Bank account not found"}, 404

@app.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(email=user.email, password_hash=hash_password(user.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"id": new_user.id, "email": new_user.email}

@app.post("/create_link_token")
def create_link_token(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    try:
        request = LinkTokenCreateRequest(
            user=LinkTokenCreateRequestUser(client_user_id=str(user.id)),
            client_name="Your App Name",
            products=[Products('auth'), Products('transactions')],
            country_codes=[CountryCode('US')],
            language='en'  # Required

    )
        link_token_response = plaid_client.link_token_create(request)
        return {"link_token": link_token_response['link_token']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
  
@app.post("/api/bank/connect")
def connect_bank_account(user_id: int, access_token: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    try:
        # Fetch bank account details using Plaid
        account_response = plaid_client.accounts_get(access_token)
        accounts = account_response["accounts"]
        
        for account in accounts:
            bank_account = BankAccount(
                user_id=user.id,
                account_id=account["account_id"],
                balance=account["balances"]["current"],
                currency=account["balances"]["iso_currency_code"]
            )
            db.add(bank_account)
        
        db.commit()
        return {"message": "Bank accounts connected successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))