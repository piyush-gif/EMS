from fastapi import FastAPI
from database import engine # connection to database
from models import Base

Base.metadata.create_all(bind=engine) #metadata = all table info, bind = witch DB to use, 

# meta.create_all = look at the models and make the database  tables for it
app = FastAPI()

@app.get("/")
def root():
  return {"message" : "Hello World"}

