require('dotenv').config();
let express = require('express');
let fileUpload = require('express-fileupload');
require('dotenv').config() //.env
let jwt = require('jsonwebtoken');
const {verify} = require('jsonwebtoken');
let cookieParser = require('cookie-parser');

let port = 4500;
let app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({}));
app.set('view engine', 'ejs');
let indexController = require('./controllers/indexController');
let userController = require('./controllers/userController');



function adminAuthorization(req, res, next) {
    try {
        let accessToken = req.cookies.jwtAdminToken;
        // console.log(accessToken)
        if (!accessToken) {
            return res.redirect('/admin')
        }
        let token = req.cookies.jwtAdminToken
        let secret = process.env.DB_SECRET;
        try {
            req['jwtAdminInfo'] = verify(token, secret)
            next()
        } catch (error) {
            res.redirect('/admin')
        //     remove /
        }

    } catch (e) {
        // console.log(e)
    }
}

function userAuthorization(req, res, next) {
    try {
        let accessToken = req.cookies.jwtUserToken;
        // console.log(accessToken)
        if (!accessToken) {
            return res.redirect('/user-login')
        }
        let token = req.cookies.jwtUserToken
        let secret = process.env.DB_SECRET;
        try {
            req['jwtUserInfo'] = verify(token, secret)
            next()
        } catch (error) {
            res.redirect('/user-login')
        }

    } catch (e) {
        // console.log(e)
    }
}




app.get('/', indexController.index);

// ADMIN
app.get("/admin", indexController.adminLogin)
// app.get("/admin-login", indexController.adminLogin)
app.get("/home3", indexController.home3)
app.get("/home4", indexController.home4)
app.post("/admin-login", indexController.adminLoginAction)
app.get("/admin-dashboard", adminAuthorization, userController.adminDashboard)
app.get("/Logout",(req,res)=>{
    res.clearCookie('jwtAdminToken')
    res.render('admin/admin_homepage');
})
app.get("/change_password", adminAuthorization, indexController.change_password)
app.post("/change_password_form", adminAuthorization, indexController.change_password_form)
app.get("/forgot_password", indexController.forgot_password)
app.post("/forgot_password_form", indexController.forgot_password_form)
app.post("/verify_otp", indexController.verify_otp)
app.get("/admin-change_password/:email", userController.admin_change_password)
app.post("/change_password_form2/:email", indexController.change_password_form2)


// USERS
app.get("/signin", indexController.signin)
app.get("/home1", indexController.home1)
app.get("/home2", indexController.home2)
app.get("/signup1", indexController.signup1)
app.get("/services-details", indexController.services_details)
app.get("/services-details2", indexController.services_details2)
app.get("/faq", indexController.faq)
app.get("/faq_signin", indexController.faq_signin)
app.get("/testimonials", indexController.testimonials)
app.get("/testimonials2", indexController.testimonials2)
app.post('/signupAction', indexController.signupAction);
app.post("/user-login", indexController.userLoginAction)
app.get("/user-login", indexController.userLogin)
app.get("/user-dashboard", userAuthorization, userController.userDashboard)
app.get("/user-dashboard2", userController.userDashboard2)
app.get("/Logout_user",(req,res)=>{
    res.clearCookie('jwtUserToken')
    res.render('user/index');
})
app.get("/home", indexController.home)
app.get("/book_taxi", userAuthorization, indexController.book_taxi)
app.get("/bookDrivers", userAuthorization, indexController.bookDrivers);
app.get('/all_information/:id', userAuthorization, indexController.all_information);
app.get("/change_password_user", userAuthorization, indexController.change_password_user)
app.post("/change_password_user1", userAuthorization, indexController.change_password_user1)
app.get("/forgot_password_user", indexController.forgot_password_user)
app.post("/forgot_password_user_form", indexController.forgot_password_user_form)
app.post("/verify_otp_user", indexController.verify_otp_user)
app.get("/user-change_password/:email", userController.user_change_password)
app.post("/change_password_user2/:email", indexController.change_password_user2)
app.post("/check_availability", indexController.check_availability)
app.post("/bookTaxi1", indexController.bookTaxi1)
app.post("/information/:id", userAuthorization, indexController.information)
app.post("/user_information",userAuthorization, indexController.user_information)
app.post("/booking", userAuthorization, indexController.booking)
app.get("/view_bookings", userAuthorization, indexController.view_bookings)
app.post("/viewBookings", userAuthorization, indexController.viewBookings)
app.get("/contact", indexController.contact)
app.get("/contact2", indexController.contact2)
app.post("/contactinfo", indexController.contactinfo)
app.post("/newsletter", indexController.newsletter)


// DRIVER
app.get("/driver_information", adminAuthorization, indexController.driver_information)
app.post("/Driver_form", adminAuthorization, indexController.Driver_form)
app.get("/View_information", adminAuthorization, indexController.View_information)
app.get("/viewDrivers", adminAuthorization, indexController.viewDrivers)
app.get('/viewDriverDetails/:id', adminAuthorization, indexController.viewDriverDetails)
app.post('/updateInformation', adminAuthorization, indexController.updateInformation)
app.get('/delete-information/:id', adminAuthorization, indexController.delete_information)




app.listen(port, (e) => {
    if (e)
        console.log(e)
    else
        console.log("server running at port  http://localhost:" + port);
})