from pydantic import BaseModel, EmailStr

class UserLogin(BaseModel):
    email: EmailStr
    password: str


class EmployeeCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    designation: str
    salary: float

class EmployeeUpdate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    designation: str
    salary: float