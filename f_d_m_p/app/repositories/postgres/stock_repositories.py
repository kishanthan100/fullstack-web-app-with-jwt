from sqlalchemy.orm import Session
from app.models.postgres import Stock, Item
from sqlalchemy.dialects.postgresql import insert

from sqlalchemy import func


class StockRepository:
    def __init__(self,db:Session):
        self.db = db
    
    def get_items_with_stock(self):
        return (
            self.db.query(
                Item.id.label("item_id"),
                Item.item_name.label("item_name"),
                func.coalesce(Stock.quantity,0).label("quantity")
            )
            .join(Stock, Stock.item_id == Item.id, isouter=True)
            .all()
        )
    

    
    def bulk_upsert(self, stock_list):
        stmt = insert(Stock).values(stock_list)

        stmt = stmt.on_conflict_do_update(
            index_elements=["item_id"],  # because of UniqueConstraint
            set_={
                "quantity": stmt.excluded.quantity
            }
        )

        self.db.execute(stmt)