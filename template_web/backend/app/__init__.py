from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from .config import Config

db=SQLAlchemy()
migrate = Migrate()
ma = Marshmallow()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    migrate.init_app(app,db)
    ma.init_app(app)
    CORS(app)

    # đăng kí Bluprint
    from app.controllers.manager import m_route
    app.register_blueprint(m_route,url_prefix = '/')
    from app.controllers.category import category_bp
    app.register_blueprint(category_bp,url_prefix = '/danhmuc')
    return app


