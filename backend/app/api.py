from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from . import crud, schemas
from .database import get_db

router = APIRouter()

@router.post("/todos/", response_model=schemas.Todo)
def create_todo_endpoint(todo: schemas.TodoCreate, db: Session = Depends(get_db)):
    return crud.create_todo(db=db, todo=todo)

@router.get("/todos/", response_model=List[schemas.Todo])
def read_todos_endpoint(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    todos = crud.get_todos(db, skip=skip, limit=limit)
    return todos

@router.get("/todos/{todo_id}", response_model=schemas.Todo)
def read_todo_endpoint(todo_id: int, db: Session = Depends(get_db)):
    db_todo = crud.get_todo(db, todo_id=todo_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo

@router.put("/todos/{todo_id}", response_model=schemas.Todo)
def update_todo_endpoint(todo_id: int, todo: schemas.TodoUpdate, db: Session = Depends(get_db)):
    db_todo = crud.update_todo(db, todo_id=todo_id, todo=todo)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo

@router.delete("/todos/{todo_id}", response_model=schemas.Todo)
def delete_todo_endpoint(todo_id: int, db: Session = Depends(get_db)):
    db_todo = crud.delete_todo(db, todo_id=todo_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo