from flask import Blueprint, redirect,render_template,url_for,request

m_route = Blueprint("manager",__name__)
@m_route.route("/")
def index():
     return render_template("manager/dashboard.html") 