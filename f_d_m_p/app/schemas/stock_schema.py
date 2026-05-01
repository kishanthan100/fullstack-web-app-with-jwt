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

class StockUpsertItem(BaseModel):
    item_id: int
    quantity: float  # prevent negative values
    
class BulkStockUpsert(BaseModel):
    stocks: List[StockUpsertItem]



    class config:
        orm_mode = True
