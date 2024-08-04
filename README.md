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
- [Contributing](#contributing)
- [License](#license)

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
    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    DB_SECRET=your_secret_key
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret
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
