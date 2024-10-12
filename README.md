
# VisionFirst Full Stack Project

## Overview
This is a full-stack web application that allows users to register, log in, and manage companies. There are two user roles: **Admin** and **Normal User**, each with different permissions. The application is built using **React.js** for the frontend and **Flask** for the backend, and integrates with a **MySQL** database to store user and company information.

## Components

### User Roles

- **Admin**: Can create, view, edit, and delete companies. Admins can also approve companies created by normal users.
- **Normal User**: Can create companies and view the companies they have created. Their companies require admin approval.

## Features

### User Roles

- **Registration**: New users can register by providing their name, email, mobile number, password, username, and role (Admin or Normal User).
- **Login**: Users can log in using their username and password. Admins are directed to the admin dashboard, while normal users see their user dashboard.
- **Admin Dashboard**: Admins can:
  - View a list of all companies.
  - Edit or delete any company.
  - Approve companies created by normal users.
- **Normal User Dashboard**: Normal users can:
  - View the list of companies.
  - Create new companies (initial status is “Unapproved” until an admin approves them).

## Technologies

- **Frontend**: React.js
- **Backend**: Flask
- **Database**: MySQL

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/ShreyaKumari13/VisionFirstFullStackProject.git
```

### 2. Navigate to the project directory

```bash
cd VisionFirstFullStackProject
```

### 3. Database Setup

- Create the database in MySQL:
  ```bash
  create database fullstack_db;
  use fullstack_db;
  ```

### 4. Backend Setup

- Navigate to the backend directory:
  ```bash
  cd backend
  ```

- Install dependencies:
  ```bash
  pip install -r requirements.txt
  ```

- Set up the virtual environment:
  ```bash
  python -m venv venv
  ```

- Activate the virtual environment:

  - For Windows:
    ```bash
    .env\Scriptsctivate
    ```

  - For macOS/Linux:
    ```bash
    source venv/bin/activate
    ```

- Initialize the database:
  ```bash
  python db_init.py
  ```

- Start the backend server:
  ```bash
  python app.py
  ```

### 5. Frontend Setup

- Navigate to the frontend directory:
  ```bash
  cd frontend
  ```

- Install dependencies:
  ```bash
  npm install
  ```

- Start the frontend server:
  ```bash
  npm start
  ```

### 6. Open the Application

- Once both the backend and frontend are running, open your browser and navigate to:
  ```bash
  http://localhost:3000
  ```

## Project Structure

- **backend/**: Contains the Flask backend with API routes for user authentication, company management, and more.
- **frontend/**: Contains the React.js frontend with user interfaces for both admin and normal users.
