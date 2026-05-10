# app/db/seed.py
from sqlalchemy.orm import Session
from app.models.postgres import User
from app.core.security import get_password_hash
from app.core.config import settings

def seed_db(db: Session):
    # Check if the table is empty
    user_count = db.query(User).count()
    
    if user_count == 0:
        print("Empty database found. Creating initial admin user...")
        admin_user = User(
            name=settings.UNAME,
            email=settings.UEMAIL,
            password=get_password_hash(settings.USERPASS), # This ensures it is Bcrypted
            nic="3992030V",
            address="ewkjnfklnq",
            phone="2909348248",
            role=settings.ROLE
        )
        db.add(admin_user)
        db.commit()
        print("Admin user created successfully.")
    else:
        print("Users already exist. Skipping seed.")