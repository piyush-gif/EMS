from fastapi import FastAPI, Depends, HTTPException, Header
from database import engine, get_db
from models import Base, User, Employee
from sqlalchemy.orm import Session
from schemas.user import UserRegister
import bcrypt
from schemas.employee import UserLogin, EmployeeCreate, EmployeeUpdate
from utils.security import create_access_token, create_refresh_token, verify_token , get_current_user
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
    return {"message": "Hello World"}


@app.post("/register")
def post_register(user: UserRegister, db: Session = Depends(get_db)):
    hashed = bcrypt.hashpw(user.password.encode("utf-8"), bcrypt.gensalt())
    new_user = User(
        name=user.name,
        email=user.email,
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

    access_token = create_access_token(data={"sub": str(db_user.id)})
    refresh_token = create_refresh_token(data={"sub": str(db_user.id)})

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }


@app.post("/refresh")
def refresh(authorization: str = Header(...)):
    token = authorization.replace("Bearer ", "")
    payload = verify_token(token)

    if not payload or payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    new_access_token = create_access_token(data={"sub": payload["sub"]})
    return {"access_token": new_access_token, "token_type": "bearer"}


@app.post("/employees")
def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    new_employee = Employee(
        name=employee.name,
        email=employee.email,
        phone=employee.phone,
        designation=employee.designation,
        salary=employee.salary
    )
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)
    return new_employee

@app.get("/employees")
def get_employees(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return db.query(Employee).all()

@app.put("/employees/{employee_id}")
def update_employee(employee_id: int, employee: EmployeeUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    db_employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not db_employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    db_employee.name = employee.name
    db_employee.email = employee.email
    db_employee.phone = employee.phone
    db_employee.designation = employee.designation
    db_employee.salary = employee.salary
    db.commit()
    db.refresh(db_employee)
    return db_employee

@app.delete("/employees/{employee_id}")
def delete_employee(employee_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    db_employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not db_employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    db.delete(db_employee)
    db.commit()
    return {"message": "Employee deleted", "id": employee_id}


@app.get("/profile")
def get_profile(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    user = db.query(User).filter(User.id == int(current_user["sub"])).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "created_at": user.created_at
    }

@app.post("/logout")
def logout(current_user = Depends(get_current_user)):
    return {"message": "Logged out successfully"}