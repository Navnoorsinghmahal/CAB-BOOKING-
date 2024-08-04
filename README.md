# CAB-BOOKING

This repository contains the source code for a Cab Booking System. It includes both user and admin interfaces to manage cab bookings efficiently. The system is built using Node.js, Express, MySQL, and other modern web technologies.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)

## Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/Navnoorsinghmahal/CAB-BOOKING.git
    cd CAB-BOOKING
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up the database:**
    - Create a MySQL database.
    - Import the provided SQL file (`database/schema.sql`) to set up the database schema.

4. **Configure environment variables:**
    Create a `.env` file in the root directory and add the following environment variables:
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=YOUR_PASSWORD
    DB_DATABASE=DATABASE_NAME
    DB_SECRET=YOUR_SECRET
    DB_USER_TOKEN=YOUR_USER_TOKEN
    DB_PASS=YOUR_EMAIL_PASS_KEY
    ```

## Configuration

- Ensure that your MySQL server is running and accessible.
- Configure your Razorpay credentials in the `.env` file for payment processing.
- Configure your mail service credentials in the `.env` file for the NodeMailer setup.

## Usage

1. **Start the server:**
    ```sh
    npm start
    ```

2. **Access the application:**
    - User Interface: [http://localhost:4500](http://localhost:4500)
    - Admin Interface: [http://localhost:4500/admin](http://localhost:4500/admin)

## Features

- User Authentication (Signup, Login, Logout)
- Password Management (Change Password, Forgot Password)
- Booking Management (Book a Taxi, View Bookings)
- Driver Availability Check
- Email Notifications via NodeMailer
- Payment Processing via Razorpay
- User Dashboard
- Admin Dashboard

## Folder Structure

```bash
CAB-BOOKING/
├── public/                 # Static files (CSS, JS, images)
├── routes/                 # Route definitions
│   ├── index.js            # User routes
│   └── admin.js            # Admin routes
├── views/                  # Template files
│   ├── user/               # User templates
│   └── admin/              # Admin templates
├── dbconnection/           # Database connection setup
│   └── connection.js
├── controllers/            # Controller files
│   ├── indexController.js  # User controller
│   └── adminController.js  # Admin controller
├── middleware/             # Middleware functions
├── .env                    # Environment variables
├── app.js                  # Main application file
└── package.json            # Project metadata and dependencies


## API Endpoints

### User Endpoints

- **GET /** - User homepage
- **GET /signin** - User signin page
- **GET /signup** - User signup page
- **POST /signupAction** - Handle user signup
- **POST /user-login** - Handle user login
- **GET /user-login** - User login page
- **GET /user-dashboard** - User dashboard
- **GET /home** - Home page
- **GET /book_taxi** - Book a taxi page
- **GET /bookDrivers** - Book drivers page
- **GET /all_information/:id** - View booking information
- **GET /change_password_user** - Change password page
- **POST /change_password_user1** - Handle password change
- **GET /forgot_password_user** - Forgot password page
- **POST /forgot_password_user_form** - Handle forgot password
- **POST /verify_otp_user** - Verify OTP
- **GET /user-change_password/:email** - Change password by email
- **POST /change_password_user2/:email** - Handle password change by email
- **POST /check_availability** - Check driver availability
- **POST /bookTaxi1** - Handle taxi booking
- **POST /information/:id** - Submit booking information
- **POST /user_information** - Submit user information
- **POST /booking** - Handle booking
- **GET /view_bookings** - View user bookings
- **POST /viewBookings** - View user bookings
- **GET /contact** - Contact page
- **GET /contact2** - Contact page
- **POST /contactinfo** - Handle contact form submission
- **POST /newsletter** - Handle newsletter signup

### Admin Endpoints

- **GET /admin** - Admin homepage
- **GET /home3** - Admin home 3
- **GET /home4** - Admin home 4
- **POST /admin-login** - Handle admin login
- **GET /admin-dashboard** - Admin dashboard
- **GET /Logout** - Admin logout
- **GET /change_password** - Change password page
- **POST /change_password_form** - Handle password change
- **GET /forgot_password** - Forgot password page
- **POST /forgot_password_form** - Handle forgot password
- **POST /verify_otp** - Verify OTP
- **GET /admin-change_password/:email** - Change password by email
- **POST /change_password_form2/:email** - Handle password change by email
- **GET /driver_information** - Admin driver information
- **POST /Driver_form** - Handle driver form submission
- **GET /View_information** - View driver information
- **GET /viewDrivers** - View all drivers
- **GET /viewDriverDetails/:id** - View driver details
- **POST /updateInformation** - Update driver information
- **GET /delete-information/:id** - Delete driver information

## Dependencies

- `bootstrap-icons`
- `cookie-parser`
- `dotenv`
- `ejs`
- `express`
- `express-fileupload`
- `jsonwebtoken`
- `mysql`
- `nodemailer`
- `nodemon`


