let conn = require('../dbconnection /connection');
const {errorFunc} = require("express-fileupload/lib/utilities");
let cookieParser = require('cookie-parser');
let userController = {};

userController.adminDashboard = async (req,res)=>{
    res.render("admin/dashboard");
    // res.render("user/dashboard",{email:req.user.email});
}

userController.userDashboard = async (req,res)=>{
    res.render("user/user_dashboard");
    // res.render("user/dashboard",{email:req.user.email});
}
userController.userDashboard2 = async (req,res)=>{
    res.render("user/signin");
    // res.render("user/dashboard",{email:req.user.email});
}

userController.admin_change_password = async (req,res)=>{
    // console.log(req.params.email)
    res.render('admin/change_password2', {email:req.params.email});
}

userController.user_change_password = async(req,res)=>{
    res.render('user/change_password_user2', {email:req.params.email});
}

module.exports = userController