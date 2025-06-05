from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import TIMESTAMP, Boolean, Date, ForeignKey, Numeric, create_engine, Column, Integer, String
from pydantic import BaseModel


Base = declarative_base()

class UserCreate(BaseModel):
    email: str
    password: str

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    email = Column(String)
    password_hash = Column(String)
    created_at = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP")
    updated_at = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP", onupdate="CURRENT_TIMESTAMP")

    def __repr__(self):
        return f"<User(id={self.id}, email={self.email})>"

class BankAccount(Base):
    __tablename__ = 'bank_accounts'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), unique=True)
    plaid_access_token = Column(String(255), nullable=False)
    account_id = Column(String(255), nullable=False)
    name = Column(String(255))
    official_name = Column(String(255))
    bank_name = Column(String(50))
    type = Column(String(50))
    balance = Column(Numeric(15, 2))
    currency = Column(String(3))
    created_at = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP")
    updated_at = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP", onupdate="CURRENT_TIMESTAMP")

    def __repr__(self):
        return f"<BankAccount(id={self.id}, user_id={self.user_id}, name={self.name})>"

class Transaction(Base):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True)
    account_id = Column(Integer, ForeignKey('bank_accounts.id', ondelete='CASCADE'), nullable=False)
    amount = Column(Numeric(15, 2), nullable=False)
    date = Column(Date, nullable=False)
    description = Column(String(255), nullable=False)
    merchant_name = Column(String(255), nullable=False)
    category = Column(String(255), nullable=False)
    pending = Column(Boolean, server_default='false')
    created_at = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP")

    def __repr__(self):
        return f"<Transaction(id={self.id}, account_id={self.account_id}, amount={self.amount}, date={self.date})>"
