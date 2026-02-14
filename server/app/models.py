from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column (Integer, primary_key = True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Employee(Base):
    __tablename__ = "employees"
    
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    phone = Column(String(20), nullable=False)
    designation = Column(String(100), nullable=False)
    salary = Column(Float, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())