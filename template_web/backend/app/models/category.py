from app import db

class Category(db.Model):
    __tablename__ = 'categories'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False, unique=True)  # Tên template / sản phẩm
    image = db.Column(db.String(255))                              # Ảnh đại diện
    tech_stack = db.Column(db.String(100), nullable=False)         # HTML, React, NextJS, ...
    description = db.Column(db.String(500))                          # Mô tả ngắn
    price = db.Column(db.Integer)                      
    link = db.Column(db.String(500), nullable=True)
    # Thống kê (cache để frontend load nhanh)
    rate_star = db.Column(db.Float, default=0.0)                   # Số sao trung bình (vd: 4.5)
    rate_buy = db.Column(db.Integer, default=0)                    # Tổng số lượt đánh giá/mua
    
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(),
                           onupdate=db.func.current_timestamp())

# class Rating(db.Model):
#     __tablename__ = 'ratings'
    
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # ai đánh giá (nếu có bảng User)
#     category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))  # đánh giá cho sp nào
#     stars = db.Column(db.Float, nullable=False)                 # số sao (1 → 5, có thể 4.5)
#     created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    
#     # Quan hệ ngược
#     category = db.relationship('Category', backref='ratings')
