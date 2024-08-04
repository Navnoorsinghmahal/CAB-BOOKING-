\documentclass{article}
\usepackage{hyperref}
\usepackage{listings}
\usepackage{courier}
\usepackage{geometry}
\geometry{a4paper, margin=1in}

\title{CAB-BOOKING}
\author{Navnoorsinghmahal}
\date{\today}

\begin{document}

\maketitle

\tableofcontents

\section{Introduction}
This repository contains the source code for a Cab Booking System. It includes both user and admin interfaces to manage cab bookings efficiently. The system is built using Node.js, Express, MySQL, and other modern web technologies.

\section{Installation}
\begin{enumerate}
    \item \textbf{Clone the repository:}
    \begin{lstlisting}[language=bash]
    git clone https://github.com/Navnoorsinghmahal/CAB-BOOKING.git
    cd CAB-BOOKING
    \end{lstlisting}
    
    \item \textbf{Install dependencies:}
    \begin{lstlisting}[language=bash]
    npm install
    \end{lstlisting}
    
    \item \textbf{Set up the database:}
    \begin{itemize}
        \item Create a MySQL database.
        \item Import the provided SQL file (\texttt{database/schema.sql}) to set up the database schema.
    \end{itemize}
    
    \item \textbf{Configure environment variables:}
    Create a \texttt{.env} file in the root directory and add the following environment variables:
    \begin{lstlisting}
    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    DB_SECRET=your_secret_key
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret
    \end{lstlisting}
\end{enumerate}

\section{Configuration}
\begin{itemize}
    \item Ensure that your MySQL server is running and accessible.
    \item Configure your Razorpay credentials in the \texttt{.env} file for payment processing.
    \item Configure your mail service credentials in the \texttt{.env} file for the nodemailer setup.
\end{itemize}

\section{Usage}
\begin{enumerate}
    \item \textbf{Start the server:}
    \begin{lstlisting}[language=bash]
    npm start
    \end{lstlisting}
    
    \item \textbf{Access the application:}
    \begin{itemize}
        \item User Interface: \url{http://localhost:4500}
        \item Admin Interface: \url{http://localhost:4500/admin}
    \end{itemize}
\end{enumerate}

\section{Features}
\begin{itemize}
    \item User Authentication (Signup, Login, Logout)
    \item Password Management (Change Password, Forgot Password)
    \item Booking Management (Book a Taxi, View Bookings)
    \item Driver Availability Check
    \item Email Notifications via NodeMailer
    \item Payment Processing via Razorpay
    \item User Dashboard
    \item Admin Dashboard
\end{itemize}

\section{Folder Structure}
\begin{verbatim}
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
\end{verbatim}

\section{API Endpoints}
\subsection{User Endpoints}
\begin{itemize}
    \item \textbf{GET} \texttt{/} - User homepage
    \item \textbf{GET} \texttt{/signin} - User signin page
    \item \textbf{GET} \texttt{/signup} - User signup page
    \item \textbf{POST} \texttt{/signupAction} - Handle user signup
    \item \textbf{POST} \texttt{/user-login} - Handle user login
    \item \textbf{GET} \texttt{/user-login} - User login page
    \item \textbf{GET} \texttt{/user-dashboard} - User dashboard
    \item \textbf{GET} \texttt{/home} - Home page
    \item \textbf{GET} \texttt{/book\_taxi} - Book a taxi page
    \item \textbf{GET} \texttt{/bookDrivers} - Book drivers page
    \item \textbf{GET} \texttt{/all\_information/:id} - View booking information
    \item \textbf{GET} \texttt{/change\_password\_user} - Change password page
    \item \textbf{POST} \texttt{/change\_password\_user1} - Handle password change
    \item \textbf{GET} \texttt{/forgot\_password\_user} - Forgot password page
    \item \textbf{POST} \texttt{/forgot\_password\_user\_form} - Handle forgot password
    \item \textbf{POST} \texttt{/verify\_otp\_user} - Verify OTP
    \item \textbf{GET} \texttt{/user-change\_password/:email} - Change password by email
    \item \textbf{POST} \texttt{/change\_password\_user2/:email} - Handle password change by email
    \item \textbf{POST} \texttt{/check\_availability} - Check driver availability
    \item \textbf{POST} \texttt{/bookTaxi1} - Handle taxi booking
    \item \textbf{POST} \texttt{/information/:id} - Submit booking information
    \item \textbf{POST} \texttt{/user\_information} - Submit user information
    \item \textbf{POST} \texttt{/booking} - Handle booking
    \item \textbf{GET} \texttt{/view\_bookings} - View user bookings
    \item \textbf{POST} \texttt{/viewBookings} - View user bookings
    \item \textbf{GET} \texttt{/contact} - Contact page
    \item \textbf{GET} \texttt{/contact2} - Contact page
    \item \textbf{POST} \texttt{/contactinfo} - Handle contact form submission
    \item \textbf{POST} \texttt{/newsletter} - Handle newsletter signup
\end{itemize}

\subsection{Admin Endpoints}
\begin{itemize}
    \item \textbf{GET} \texttt{/admin} - Admin homepage
    \item \textbf{GET} \texttt{/home3} - Admin home 3
    \item \textbf{GET} \texttt{/home4} - Admin home 4
    \item \textbf{POST} \texttt{/admin-login} - Handle admin login
    \item \textbf{GET} \texttt{/admin-dashboard} - Admin dashboard
    \item \textbf{GET} \texttt{/Logout} - Admin logout
    \item \textbf{GET} \texttt{/change\_password} - Change password page
    \item \textbf{POST} \texttt{/change\_password\_form} - Handle password change
    \item \textbf{GET} \texttt{/forgot\_password} - Forgot password page
    \item \textbf{POST} \texttt{/forgot\_password\_form} - Handle forgot password
    \item \textbf{POST} \texttt{/verify\_otp} - Verify OTP
    \item \textbf{GET} \texttt{/admin-change\_password/:email} - Change password by email
    \item \textbf{POST} \texttt{/change\_password\_form2/:email} - Handle password change by email
    \item \textbf{GET} \texttt{/driver\_information} - Admin driver information
    \item \textbf{POST} \texttt{/Driver\_form} - Handle driver form submission
    \item \textbf{GET} \texttt{/View\_information} - View driver information
    \item \textbf{GET} \texttt{/viewDrivers} - View all drivers
    \item \textbf{GET} \texttt{/viewDriverDetails/:id} - View driver details
    \item \textbf{POST} \texttt{/updateInformation}
