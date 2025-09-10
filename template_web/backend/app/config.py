import os 
import string
import random

class Config:
    SECRET_KEY = os.urandom(24)
    SQLALCHEMY_DATABASE_URI ="mysql://root@localhost/templateweb"
    SQLALCHEMY_TRACK_MODIFICATIONS = False