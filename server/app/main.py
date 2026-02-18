from fastapi import FastAPI, Depends, HTTPException
from database import engine, get_db
from models import Base
from sqlalchemy.orm import Session
from schemas.user import UserRegister
from models import User
import bcrypt
from schemas.employee import UserLogin

from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def root():
  return {"message" : "Hello World"}



@app.post("/register")
def post_register(user : UserRegister, db: Session = Depends(get_db)):

  hashed = bcrypt.hashpw(user.password.encode("utf-8"), bcrypt.gensalt())
  new_user = User(
    name=user.name,
    email= user.email,
    password=hashed.decode("utf-8")
  )
  db.add(new_user)
  db.commit()
  db.refresh(new_user)

  return {"message": "Registered", "id": new_user.id}

  

@app.post("/login")
def post_login(user: UserLogin, db: Session = Depends(get_db)):

  db_user = db.query(User).filter(User.email == user.email).first()

  if not db_user:
    raise HTTPException(status_code=401, detail="Invalid email or password")
  
  is_valid = bcrypt.checkpw(user.password.encode("utf-8"), db_user.password.encode("utf-8"))

  if not is_valid:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
  return {"message": "Login successful", "id": db_user.id}