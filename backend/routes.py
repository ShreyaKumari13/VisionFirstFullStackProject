# backend/routes.py

from flask import Blueprint, request, jsonify
from models import db, User, Company
from flask_bcrypt import Bcrypt
   
from flask import Blueprint, request, jsonify
from models import Company, User, db  # Make sure you have the appropriate imports

bcrypt = Bcrypt()

user_routes = Blueprint('user_routes', __name__)
company_routes = Blueprint('company_routes', __name__)

# Route to register users
@user_routes.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()

    # Check if username already exists
    existing_user = User.query.filter_by(username=data['username']).first()
    if existing_user:
        return jsonify({"message": "Username already exists"}), 400

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    new_user = User(
        name=data['name'],
        username=data['username'],
        password=hashed_password,
        role=data['role'],
        email=data['email'],
        mobile=data['mobile']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201

# Route to login users
@user_routes.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({"message": "Login successful", "role": user.role}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401
    
    
    
    
 

company_routes = Blueprint('company_routes', __name__)

@company_routes.route('/company', methods=['POST'])
def create_company():
    data = request.get_json()

    # Ensure that all required fields are present
    required_fields = ['name', 'address', 'created_by', 'created_by_role']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({"message": f"Missing fields: {', '.join(missing_fields)}"}), 400

    # Validate user role
    if data['created_by_role'] not in ['IT_ADMIN', 'IT_USER_NORMAL']:
        return jsonify({"message": "Invalid user role"}), 400

    # Set status based on role: Admins can approve directly, users' companies remain unapproved
    status = 'APPROVED' if data['created_by_role'] == 'IT_ADMIN' else 'UNAPPROVED'

    # Check if the creator exists and has the correct role
    creator = User.query.filter_by(username=data['created_by']).first()
    if not creator:
        return jsonify({"message": "Creator not found"}), 404

    # Verify the role of the user who is creating the company
    if creator.role != data['created_by_role']:
        return jsonify({"message": "Role mismatch between creator and requested role"}), 403

    try:
        # Create new company
        new_company = Company(
            name=data['name'],
            address=data['address'],
            created_by=creator.id,
            status=status
        )
        db.session.add(new_company)
        db.session.commit()

        return jsonify({"message": "Company created successfully", "company_status": status}), 201

    except Exception as e:
        # Handle any unexpected errors
        print(f"Error: {e}")
        return jsonify({"message": "An error occurred while creating the company"}), 500


# Route to create company (for normal and admin users)
# @company_routes.route('/company', methods=['POST'])
# def create_company():
#     data = request.get_json()

#     # Validate user role
#     if data['created_by_role'] not in ['IT_ADMIN', 'IT_USER_NORMAL']:
#         return jsonify({"message": "Invalid user role"}), 400

#     # Set status based on role
#     status = 'APPROVED' if data['created_by_role'] == 'IT_ADMIN' else 'UNAPPROVED'

#     # Check if the creator exists
#     creator = User.query.filter_by(username=data['created_by']).first()
#     if not creator:
#         return jsonify({"message": "Creator not found"}), 404

#     new_company = Company(
#         name=data['name'],
#         address=data['address'],
#         created_by=creator.id,
#         status=status
#     )
#     db.session.add(new_company)
#     db.session.commit()
#     return jsonify({"message": "Company created successfully"}), 201


# @company_routes.route('/company', methods=['POST'])
# def create_company():
#     data = request.get_json()

#     # Ensure that all required fields are present
#     required_fields = ['name', 'address', 'created_by', 'created_by_role']
#     missing_fields = [field for field in required_fields if field not in data]
#     if missing_fields:
#         return jsonify({"message": f"Missing fields: {', '.join(missing_fields)}"}), 400

#     # Validate user role
#     if data['created_by_role'] not in ['IT_ADMIN', 'IT_USER_NORMAL']:
#         return jsonify({"message": "Invalid user role"}), 400

#     # Set status based on role: Admins can approve directly, users' companies remain unapproved
#     status = 'APPROVED' if data['created_by_role'] == 'IT_ADMIN' else 'UNAPPROVED'

#     # Check if the creator exists and has the correct role
#     creator = User.query.filter_by(username=data['created_by']).first()
#     if not creator:
#         return jsonify({"message": "Creator not found"}), 404

#     # Verify the role of the user who is creating the company
#     if creator.role != data['created_by_role']:
#         return jsonify({"message": "Role mismatch between creator and requested role"}), 403

#     try:
#         # Create new company
#         new_company = Company(
#             name=data['name'],
#             address=data['address'],
#             created_by=creator.id,
#             status=status
#         )
#         db.session.add(new_company)
#         db.session.commit()

#         return jsonify({"message": "Company created successfully", "company_status": status}), 201

#     except Exception as e:
#         # Handle any unexpected errors
#         print(f"Error: {e}")
#         return jsonify({"message": "An error occurred while creating the company"}), 500
    


# Route to fetch companies for admin/user
# @company_routes.route('/companies', methods=['GET'])
# def list_companies():
#     # Optional: Implement filtering based on query parameters
#     companies = Company.query.all()
#     result = []
#     for company in companies:
#         creator = User.query.get(company.created_by)
#         result.append({
#             'id': company.id,
#             'name': company.name,
#             'address': company.address,
#             'created_by': creator.username if creator else "Unknown",
#             'status': company.status
#         })
#     return jsonify(result), 200

# @company_routes.route('/companies', methods=['GET'])
# def list_companies():
#     created_by = request.args.get('created_by')
#     if created_by:
#         companies = Company.query.filter_by(created_by=created_by).all()
#     else:
#         companies = Company.query.all()

#     result = []
#     for company in companies:
#         creator = User.query.get(company.created_by)
#         result.append({
#             'id': company.id,
#             'name': company.name,
#             'address': company.address,
#             'status': company.status
#             # Exclude 'created_by' for this endpoint
#         })
#     return jsonify(result), 200


# Remove one of the duplicate list_companies functions
@company_routes.route('/companies', methods=['GET'])
def list_companies():
    created_by = request.args.get('created_by')
    if created_by:
        companies = Company.query.filter_by(created_by=created_by).all()
    else:
        companies = Company.query.all()

    result = []
    for company in companies:
        creator = User.query.get(company.created_by)
        result.append({
            'id': company.id,
            'name': company.name,
            'address': company.address,
            'created_by': creator.username if creator else "Unknown",  # Ensure this is included
            'status': company.status
        })
    return jsonify(result), 200









# Route to approve a company (Admin only)
@company_routes.route('/approve/<int:company_id>', methods=['PUT'])
def approve_company(company_id):
    company = Company.query.get(company_id)
    if not company:
        return jsonify({"message": "Company not found"}), 404
    company.status = 'APPROVED'
    db.session.commit()
    return jsonify({"message": "Company approved successfully"}), 200

# Route to delete a company (Admin only)
@company_routes.route('/delete/<int:company_id>', methods=['DELETE'])
def delete_company(company_id):
    company = Company.query.get(company_id)
    if not company:
        return jsonify({"message": "Company not found"}), 404
    db.session.delete(company)
    db.session.commit()
    return jsonify({"message": "Company deleted successfully"}), 200


@company_routes.route('/update/<int:company_id>', methods=['PUT'])
def update_company(company_id):
    company = Company.query.get(company_id)
    if not company:
        return jsonify({"message": "Company not found"}), 404
    
    data = request.get_json()
    
    # Update company details
    company.name = data.get('name', company.name)
    company.address = data.get('address', company.address)
    
    db.session.commit()

    return jsonify({"message": "Company updated successfully"}), 200


