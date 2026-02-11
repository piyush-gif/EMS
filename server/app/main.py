from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app.database import engine, get_db, Base
from app import models

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Employee Management System")

@app.get("/")
def root():
    return {"message": "Welcome to Employee Management System"}


@app.get("/test-db")
def test_database(db: Session = Depends(get_db)):
    """Test if database connection works"""
    try:
        # Try to execute a simple query
        db.execute("SELECT 1")
        return {
            "status": "success",
            "message": "Database connection successful!",
            "database": "connected"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }