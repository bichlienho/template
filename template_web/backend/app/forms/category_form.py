from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField,IntegerField
from wtforms.validators import DataRequired, Length,NumberRange,Optional,URL
from flask_wtf.file import FileField, FileAllowed


class CategoryForm(FlaskForm):
    name = StringField(
        'Template/Product Name', 
        validators=[DataRequired(), Length(min=3, max=150)]
    )
    tech_stack = StringField(
        'Tech Stack (e.g., React, NextJS)', 
        validators=[DataRequired(), Length(max=100)]
    )
    description = TextAreaField(
        'Short Description', 
        validators=[Length(max=500)]
    )
    price = IntegerField(
        'Price', 
         validators=[DataRequired(), NumberRange(min=1, message="Invalid category.")]
    )
    link = StringField(
        'YouTube Video Link',
        validators=[
            Optional(), # Cho phép bỏ trống
            URL(message="Vui lòng nhập một đường link hợp lệ.")
        ])
    image = FileField(
        'Image', 
        validators=[Optional(),FileAllowed(['jpg', 'png', 'jpeg'], 'Images only!')]
    )
    submit = SubmitField('Save')