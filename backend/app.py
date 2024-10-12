# backend/app.py

from flask import Flask
from flask_cors import CORS
from models import db
from routes import user_routes, company_routes

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Database configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:tigertiger@localhost/fullstack_db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize the database
    db.init_app(app)

    # Register blueprints
    app.register_blueprint(user_routes, url_prefix="/api")
    app.register_blueprint(company_routes, url_prefix="/api")

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
