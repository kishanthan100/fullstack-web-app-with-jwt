from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services.postgres.stock_service import StockService
from app.db.postgres import get_db
from app.core.security import get_current_user



router = APIRouter()
    

@router.get("/list-stocks")
def list_stock(db:Session = Depends(get_db)):
    service = StockService(db)
    result = service.show_create_stocks()
    return result


