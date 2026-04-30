from pydantic import BaseModel
from typing import List
from datetime import datetime

class StockCreate(BaseModel):
    quantity: float
    item_id: int

class StockResponse(BaseModel):
    id: int
    item_id: int
    created_date: datetime
    quantity: float

class UpdateStock(BaseModel):
    quantity: float

class ItemStockResponse(BaseModel):
    item_id: int
    item_name: str
    quantity: int

    class config:
        orm_mode = True
