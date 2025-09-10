from flask import Blueprint,request,redirect,jsonify,url_for,render_template,flash
from app.models.category import Category
from app import db
from app.schemas.category_schema import category_schema,categories_schema
from app import db
from app.forms.category_form import CategoryForm
import os
from werkzeug.utils import secure_filename
from flask import current_app


category_bp = Blueprint('dm',__name__)
# lấy tất cả
@category_bp.route('',methods = ['GET'])
def get_categories():
    dm = Category.query.all()
    return jsonify(categories_schema.dump(dm))
# thêm
@category_bp.route('',methods = ['POST'])
def add_categories():
    data = category_schema.load(request.json)
    danhmuc = Category(**data)
    db.session.add(danhmuc)
    db.session.commit()
    return jsonify(category_schema.dump(danhmuc)),201
# xóa
@category_bp.route('/<int:id>',methods = ['DELETE'])
def del_categories(id):
    danhmuc = Category.query.get_or_404(id)
    db.session.delete(danhmuc)
    db.session.commit()
    return jsonify({'message': "Xóa Danh Mục thành công"})
#sửa
@category_bp.route('/<int:id>',methods = ['PUT'])
def edit_categories(id):
    danhmuc = Category.query.get_or_404(id)
    data = category_schema.load(request.json,partial=True)
    for key,value in data.items():
        setattr(danhmuc,key,value)
    db.session.commit()
    return jsonify(category_schema.dump(danhmuc))
#detail
# Trong file controller của category_bp
@category_bp.route('/<int:id>', methods=['GET'])
def get_category_detail(id):
    category = Category.query.get_or_404(id)
    return jsonify(category_schema.dump(category))

# **************************************
#load list
@category_bp.route("/list")
def list_categories():
    page = request.args.get('page', 1, type=int)
    search_term = request.args.get('search', '')

    if search_term:
        # Lọc danh mục theo tên nếu có tìm kiếm
        categories = Category.query.filter(Category.name.ilike(f'%{search_term}%')).paginate(page=page, per_page=10)
    else:
        # Lấy tất cả và phân trang
        categories = Category.query.paginate(page=page, per_page=10)
    return  render_template ("category/list.html",categories=categories,search_term=search_term)

#load add
# Route để hiển thị form thêm mới


# Route để xử lý việc thêm mới
@category_bp.route("/add", methods=['GET', 'POST'])
def add_category():
    form = CategoryForm()
    if form.validate_on_submit():
        # Lấy dữ liệu từ form đã được validate
        name = form.name.data
        tech_stack = form.tech_stack.data
        description = form.description.data
        price = form.price.data
        link = form.link.data
        
        # Xử lý upload file ảnh
        image_filename = None
        if form.image.data:
            f = form.image.data
            image_filename = secure_filename(f.filename)
            # Tạo đường dẫn lưu file an toàn
            f.save(os.path.join(current_app.root_path, 'static/uploads', image_filename))

        # Tạo đối tượng Category mới và lưu vào DB
        new_category = Category(
            name=name,
            tech_stack=tech_stack,
            description=description,
            price = price,
            link = link,
            image=f'uploads/{image_filename}' if image_filename else None
        )
        db.session.add(new_category)
        db.session.commit()
        
        flash('Category added successfully!', 'success')
        return redirect(url_for('dm.list_categories'))

    # Nếu là request GET hoặc form không hợp lệ, hiển thị lại form
    return render_template("category/form.html", 
                           form=form, 
                           form_title="Add New Category")
#edit
# Route để hiển thị form chỉnh sửa
@category_bp.route("/edit/<int:id>", methods=['GET', 'POST'])
def edit_category(id):
    category = Category.query.get_or_404(id)
    # `obj=category` sẽ tự động điền dữ liệu cũ vào form
    form = CategoryForm(obj=category)

    if form.validate_on_submit():
        # Cập nhật đối tượng category với dữ liệu mới từ form
        category.name = form.name.data
        category.tech_stack = form.tech_stack.data
        category.description = form.description.data
        category.price = form.price.data
        category.link = form.link.data

         # Lấy file từ request.files, không phải từ form.image.data
        uploaded_file = request.files.get('image')
        
        # Chỉ xử lý nếu người dùng thực sự upload một file mới
        if uploaded_file and uploaded_file.filename != '':
            image_filename = secure_filename(uploaded_file.filename)
            # Lưu file mới
            uploaded_file.save(os.path.join(current_app.root_path, 'static/uploads', image_filename))
            # Cập nhật đường dẫn ảnh trong database
            category.image = f'uploads/{image_filename}'


        db.session.commit()
        flash('Category updated successfully!', 'success')
        return redirect(url_for('dm.list_categories'))

    # Nếu là request GET, hiển thị form với dữ liệu cũ
    return render_template("category/form.html", 
                           form=form, 
                           form_title="Edit Category")

#xóa
# Route để xử lý việc xóa
@category_bp.route("/delete/<int:id>", methods=['POST'])
def delete_category(id):
    category = Category.query.get_or_404(id)
    db.session.delete(category)
    db.session.commit()
    flash('Category deleted successfully!', 'success')
    return redirect(url_for('dm.list_categories'))