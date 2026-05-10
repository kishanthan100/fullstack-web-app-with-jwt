from fastapi import APIRouter, Depends, HTTPException,Request
from sqlalchemy.orm import Session
from app.services.postgres.item_service import ItemService
from app.services.postgres.stock_service import StockService
from app.services.postgres.customer_service import CustomerService
from app.services.postgres.user_service import UserService
from app.db.postgres import get_db


router = APIRouter()

@router.get("/dashboard")
def dashboard(db: Session = Depends(get_db)):
    item_service = ItemService(db)
    customer_service = CustomerService(db)
    user_dervice = UserService(db)

    try:
        item = item_service.get_count_items()
        customer = customer_service.get_count_customers()
        user = user_dervice.get_count_users()
        return {"item_count":item, 
                "customer_count":customer,
                "user_count":user}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    

