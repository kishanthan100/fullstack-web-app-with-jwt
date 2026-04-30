from sqlalchemy.exc import IntegrityError
from app.repositories.postgres.stock_repositories import StockRepository
from app.repositories.redis.stock_cache_repository import StocksCacheRepository
from app.schemas.stock_schema import StockCreate
from fastapi import HTTPException

class StockService:

    def __init__(self, db):
        self.repo = StockRepository(db)
        self.cache = StocksCacheRepository()


    def create_stocks(self,stock_data: StockCreate):
        existing = self.repo.create(stock_data.quantity, stock_data.item_id)
        if existing:
            raise HTTPException(
                status_code=400,
                detail="Stock already exists for this item"
            )
        try:
            stock = self.repo.create(stock_data.quantity, 
                                     stock_data.item_id
                                     )
                                     

            self.repo.db.commit()
            self.repo.db.refresh(stock)
            self.cache.delete("stock:all")
            return stock

        except IntegrityError:
            self.repo.db.rollback()
            raise HTTPException(
        status_code=400,
        detail="Stock already exists for this item"
    )



    def show_create_stocks(self):
        result = self.repo.get_items_with_stock()
        return [
            {
                "item_id": row.item_id,
                "item_name":row.item_name,
                "quantity": row.quantity,
            }
            for row in result
        ]

   