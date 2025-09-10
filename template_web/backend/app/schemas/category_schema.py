from marshmallow import Schema, fields

class CategorySchema(Schema):
    id = fields.Int(dump_only=True)             # chỉ trả về, không cho user nhập
    name = fields.Str(required=True)            # tên template
    image = fields.Str()                        # đường dẫn ảnh
    tech_stack = fields.Str(required=True)      # HTML, React, NextJS...
    description = fields.Str()                  # mô tả
    price = fields.Int()
    link = fields.Str()               
    rate_star = fields.Float(dump_only=True)    # số sao trung bình (tự tính)
    rate_buy = fields.Int(dump_only=True)       # số lượt đánh giá/mua (tự tính)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)

category_schema = CategorySchema()
categories_schema = CategorySchema(many = True)
