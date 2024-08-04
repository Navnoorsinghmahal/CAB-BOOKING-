let conn = require('../dbconnection /connection');
const {errorFunc} = require("express-fileupload/lib/utilities");
let indexController = {}
let jwt = require('jsonwebtoken');
const {sign} = require('jsonwebtoken')
const sea = require("node:sea");
let {DB_SECRET ,DB_USER_TOKEN} = process.env;
const nodemailer = require('nodemailer');


// INDEX
indexController.index = (req, res) => {
    res.render('user/index');
}



// USER

indexController.signin = async(req, res) => {
    res.render('user/signin');
}

indexController.home1 = async(req, res) => {
    res.render('user/index');
}

indexController.home2 = async(req, res) => {
    res.render('user/user_dashboard');
}

indexController.services_details = (req, res) => {
    res.render('user/services-details_login');
}

indexController.services_details2 = (req, res) => {
    res.render('user/service-details_index');
}

indexController.signup1 = async(req, res) => {
    res.render('user/signup');
}

indexController.faq_signin = async(req, res) => {
    res.render('user/faqs_signin');
}

indexController.faq=async(req, res) => {
    res.render('user/faqs');
}

indexController.testimonials = async(req, res) => {
    res.render('user/testimonials');
}

indexController.testimonials2 = (req, res) => {
    res.render('user/testimonials_signin');
}

indexController.signupAction = async (req, res) => {
    try {
        console.log(req.body);

        let {firstName, lastName, email, password, phoneNumber, gender} = req.body;

        let selectSql = `select * from user_login where email='${email}'`;
        conn.query(selectSql, (err, row) => {
            if (err)
                res.json({error: err, message: err.message});
            else {
                if (row.length > 0) {
                    res.json({error: true, message: "Email id already exists"});
                } else {
                            let insertSql = `insert into user_login(email,password,firstName,lastName, phonenumber, gender) values('${email}','${password}',
'${firstName}','${lastName}','${phoneNumber}', '${gender}')`
                            // console.log(insertSql)
                            conn.query(insertSql, (e) => {
                                if (e) {
                                    res.json({error: true, message: e.message})
                                } else {
                                    res.json({error: false, message: "User signed up successfully"})
                                }

                            })
                    }

                }
            })


    } catch (e) {
        res.json({error: true, message: e.message})

    }
}

indexController.userLogin = async (req,res)=>{
    res.render('user/index')
}

indexController.userLoginAction = async (req,res)=>{
    try{
        // console.log(req.body)
        let {email,password} = req.body;
        let selectSql = `select * from user_login where email='${email}' and password='${password}'`;
        // console.log(selectSql);
        conn.query(selectSql, (e,row) => {
            if(e)
                res.json({error:true,message:e.message})
            else
            {
                if(row.length > 0){
                    // let data = row[0];
                    sign({
                        "user_id":row[0].user_id,
                        "email":row[0].email,
                        "firstName":row[0].firstName,
                        "lastName":row[0].lastName,
                        "gender":row[0].gender,

                    },DB_SECRET,{expiresIn: '1d'},(e,token)=>{
                        if(e)
                            res.json({error: true, message: e.message})
                        else
                        {
                            // console.log(token)
                            res.cookie("jwtUserToken", token, "1d");

                            res.json({error: false, message: "Logged in successfully",data : token})
                        }
                    })
                }
                else{
                    res.json({error: true, message: "Data not matched"});
                }
            }
        })
    }
    catch (e){
        // console.log(e)
    }
}

indexController.book_taxi = async (req,res)=>{
    res.render('user/book_taxi')
}

indexController.bookDrivers = async (req,res)=>{
    try {
        const carType = req.query.type;
        let selectSql = 'select * from driver_information';
        // (selectSql);console.log
        console.log(selectSql)

        if (carType) {
            selectSql += ' WHERE type = ?';
        }

        conn.query(selectSql, [carType], (e, rows) => {
            console.log(rows);
            if (e) {
                res.json({error: true, message: e.message})
            } else {

                res.json({error: false, message: "Data fetched", records: rows})
            }
        })
    } catch (e) {
        res.json({error: true, message: e.message})
    }

}

indexController.all_information = async(req,res)=>{
    try {
        const {id} = req.params;
        let selectSql = `SELECT * FROM driver_information WHERE user_id = '${id}'`;
        // console.log(selectSql);
        conn.query(selectSql, (e, rows) => {
            if (e) {
                res.json({ error: true, message: e.message });
            } else if (rows.length > 0) {
                res.json({ error: false, message: "Data fetched", records: rows });
            } else {
                res.json({ error: true, message: "Driver not found" });
            }
        });
    } catch (e) {
        res.json({ error: true, message: e.message });
    }

}

indexController.home = async(req,res)=>{
    res.render('user/user_dashboard');
}

indexController.change_password_user = async (req,res)=>{
    res.render('user/change_password_user.ejs')
}

indexController.change_password_user1 = async (req,res)=>{
    let user_id = req['jwtUserInfo']['user_id'];
    let{old_password, new_password, confirm_password} = req.body;
    // console.log(req.body)
    let selectSql = `select password from user_login where user_id='${user_id}'`;
    // console.log(selectSql)
    conn.query(selectSql, (e, record) => {
        // console.log(record[0].password)
        // console.log(old_password)
        if (e) {
            res.json({error: true, message: e.message})
        }

        else {
            if (record[0].password === old_password)

                if (new_password !== confirm_password)
                    res.json({error: true, message: "Confirm password must be same as new password!"})

                else {
                    let updateSql = `UPDATE user_login SET password = '${new_password}' WHERE user_id='${user_id}'`;

                    conn.query(updateSql, (e) => {
                        if (e) {
                            res.json({error: true, message: e.message})
                        } else {
                            res.json({error: false, message: "Passwords changed Successfully"})
                        }
                    })

                }
            else {
                res.json({error: true, message: "Old Password does not match!"})
            }

        }
    })


}

indexController.forgot_password_user = async(req,res)=>{
    res.render('user/forgot_password_user')
}

indexController.forgot_password_user_form = async(req,res)=>{
    let{email} = req.body;
    console.log(email);
    let selectSql = `select email from user_login where email='${email}'`;

    conn.query(selectSql, (e, record) => {
        // console.log(record[0].email);

        if (e) {
            res.json({error: true, message: "Wrong email entered"})
        }
        else{
            if (record[0] === undefined)
                res.json({error: true, message: "Wrong email entered"})
            else{
                // res.json({error: false, message: "Right email entered"})
                const randomCode =  Math.floor(100000 + Math.random() * 900000);
                Updatesql = `update user_login set randomCode='${randomCode}' where email='${email}'`
                conn.query(Updatesql, (e) => {
                    if (e) {
                        res.json({error: true, message: e.message})
                    }
                    else{
                        const transporter = nodemailer.createTransport({
                            host: "smtp.gmail.com",
                            port: 587,
                            secure: false, // Use `true` for port 465, `false` for all other ports
                            auth: {
                                user: "noormahal130505@gmail.com",
                                pass: process.env.DB_PASS,
                            },
                        });
                        const mailOption = {
                            from: "noormahal130505@gmail.com",
                            to : "noormahal130505@gmail.com",
                            subject: "Email",
                            text:'Your OTP to change user password is ' + randomCode
                        };
                        transporter.sendMail(mailOption, (err, info) => {
                            if (err) {
                                res.json({error: true, message: err.message})
                            }
                            else{
                                res.json({error: false, message: "OTP sent"})
                            }
                        })
                    }
                })

            }
        }
    })

}

indexController.verify_otp_user = async (req,res)=>{
    let {otp} = req.body
    console.log(otp)

    selectSql = `select randomCode from user_login where randomCode='${otp}'`;

    conn.query(selectSql, (e) => {
        if (e) {
            res.json({error: true, message: e.message})
        }
        else{
            res.json({error: false, message: "Right OTP entered"})
            updateSql = `UPDATE user_login SET randomCode = NULL WHERE randomCode = '${otp}'`;
            conn.query(updateSql, (e) => {
                if (e) {
                    res.json({error: true, message: e.message})
                }
            })
        }
    })

}

indexController.change_password_user2 = async (req,res)=>{

    let {email} = req.params
    console.log(email);

    let{new_password, confirm_password} = req.body;
    console.log(req.body)
    console.log(new_password)
    if (new_password === confirm_password) {
        let updateSql = `UPDATE user_login SET password = '${new_password}' WHERE email='${email}'`;
        console.log(updateSql)

        conn.query(updateSql, (e) => {
            if (e) {
                res.json({error: true, message: e.message})
            } else {
                res.json({error: false, message: "Passwords changed Successfully"})
            }
        })
    }

    else {
        res.json({error: true, message: "Enter same password!"})
    }

}

indexController.check_availability = async (req,res)=> {
    console.log(req.body)
    let {driverId, availabilityStartDate, availabilityEndDate} = req.body;

    selectSql = `SELECT COUNT(*) AS booking_count FROM CarBookings WHERE Car_id = '${driverId}' AND
 ((Dates_from between '${availabilityStartDate}' AND '${availabilityEndDate}')OR(Dates_to between '${availabilityStartDate}' AND '${availabilityEndDate}')OR
    ('${availabilityStartDate}' between Dates_from and Dates_to) or('${availabilityEndDate}' between Dates_to and Dates_from));`

    console.log(selectSql)

    conn.query(selectSql, (e, record) => {
        if (e) {
            res.json({error: true, message: e.message})
        }
        else{
            if (record[0].booking_count === 0) {
                res.json({error: false, message: "Driver Available"})
            }
            else{
                res.json({error: true, message: "No Driver Available"})
            }
        }
    })


}

indexController.bookTaxi1 = async (req,res)=>{
    console.log(req.body)
   let { carType, startDate, endDate } = req.body;


     selectSql = `SELECT * FROM driver_information WHERE type = '${carType}' and user_id not in (SELECT Car_id  FROM CarBookings WHERE Car_id in (select user_id from driver_information where type = '${carType}') AND
    ((Dates_from between '${startDate}' AND '${endDate}')OR(Dates_to between '${startDate}' AND '${endDate}')OR
       ('${startDate}' between Dates_from and Dates_to) or('${endDate}' between Dates_to and Dates_from)) );`

    console.log(selectSql)

    conn.query(selectSql, (e, record) => {
        if (e) {
            res.json({error: true, message: e.message})
        }
        else{
            console.log(record)

         if (record.length > 0) {
            res.json({ error: false, message: "Data fetched", records: record });
        } else {
            res.json({ error: true, message: "Driver not found" });
        }



        }
    })



}

indexController.information = async (req,res)=>{
    // console.log(req.body)
    // try{
    //     const {id} = req.params;
    //     let selectSql = `SELECT * FROM driver_information WHERE user_id = '${id}'`;
    //     // console.log(selectSql);
    //     conn.query(selectSql, (e, rows) => {
    //         if (e) {
    //             res.json({ error: true, message: e.message });
    //         } else if (rows.length > 0) {
    //             res.json({ error: false, message: "Data fetched", records: rows });
    //         } else {
    //             res.json({ error: true, message: "Driver not found" });
    //         }
    //     });
    // } catch (e) {
    //     res.json({ error: true, message: e.message });
    // }
    console.log(req.body)
    try{
        let user_id = req['jwtUserInfo']['user_id'];
        const {id} = req.params;
        let selectSql = `SELECT * FROM driver_information WHERE user_id = '${id}'`;
        // console.log(selectSql);
        conn.query(selectSql, (e, rows) => {
            if (e) {
                res.json({ error: true, message: e.message });
            } else if (rows.length > 0) {
                let selectSql = `select * from user_login where user_id = '${user_id}'`;

                conn.query(selectSql, (e, records2) => {
                    if (e) {
                        res.json({error: true, message: e.message});
                    } else if (records2.length > 0) {
                        // console.log(records2);
                        // console.log(rows);
                        res.json({error: false, message: "Data fetched", records2: records2, rows:rows});
                        // res.json({ error: false, message: "Data fetched", records: rows });
                    } else {
                        res.json({error: true, message: "Driver not found"});
                    }

                });

            } else {
                res.json({ error: true, message: "Driver not found" });
            }
        });
    } catch (e) {
        res.json({ error: true, message: e.message });
    }


}

indexController.user_information = async (req,res)=> {

    let user_id = req['jwtUserInfo']['user_id'];

    let selectSql = `select * from user_login where user_id = '${user_id}'`;

    conn.query(selectSql, (e, records2) => {
        if (e) {
            res.json({error: true, message: e.message});
        } else if (records2.length > 0) {
            res.json({error: false, message: "Data fetched", records2: records2});
        } else {
            res.json({error: true, message: "Driver not found"});
        }

    });



}

indexController.booking = async (req,res)=>{
    let user_id = req['jwtUserInfo']['user_id'];
    console.log(req.body)

    let {carId, payment_id, startDate, endDate, totalPrice, daysDiff, selectedRadio, mobile, userEmail, userName, carName} = req.body;

    let insertSql = `insert into CarBookings(Car_id, User_id, Transaction_id, Dates_from, Dates_to, Amount, Days_booked,
    With_driver, User_phone_number, Email, user_name, carName) values ('${carId}', '${user_id}', '${payment_id}', '${startDate}', '${endDate}', 
    '${totalPrice}', '${daysDiff}', '${selectedRadio}', '${mobile}', '${userEmail}', '${userName}', '${carName}' )`

    console.log(insertSql);

    conn.query(insertSql, (e, records) => {
        if (e){
            res.json({error: true, message: e.message});
        }
        else {
            res.json({error: false, message: "Payment Successful"})
        }
    })


}

indexController.view_bookings = async (req,res)=>{
    res.render('user/view_bookings');
}

indexController.viewBookings = async (req,res)=>{
    let user_id = req['jwtUserInfo']['user_id'];
    try {
        let selectSql = `select * from CarBookings where User_id = '${user_id}'`;
        conn.query(selectSql, (e, rows) => {
            if (e) {
                res.json({error: true, message: e.message})
            } else {

                        res.json({error: false, message: "Data fetched", records: rows})
                    }
                        })

            }

     catch (e) {
        res.json({error: true, message: e.message})
    }
}

indexController.contact = async (req,res)=>{
    res.render('pages/contact');
}

indexController.contact2=async (req,res)=>{
    res.render('pages/contact2');
}

indexController.contactinfo = async (req,res)=>{

    let{firstname, lastname, email, phone, message} = req.body;

    let insertSql = `insert into mails(firstname, lastname, mail, phone, body) values('${firstname}', '${lastname}', '${email}', '${phone}', '${message}')`

    conn.query(insertSql, (e, records) => {
        if (e){
            res.json({error: true, message: e.message});
        }
        else{
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // Use `true` for port 465, `false` for all other ports
                auth: {
                    user: "noormahal130505@gmail.com",
                    pass: process.env.DB_PASS,
                },
            });
            const mailOption = {
                from: "noormahal130505@gmail.com",
                to : "noormahal130505@gmail.com, '$(email)'",
                subject: "Email",
                text:'We have received your email, we will contact you as soon as possible and reply with your request '
            };
            transporter.sendMail(mailOption, (err, info) => {
                if (err) {
                    res.json({error: true, message: err.message})
                }
                else{
                    res.json({error: false, message: "Your request received successfully."})
                }
            })
        }
    })

}

indexController.newsletter = async (req,res)=>{

    let {email} = req.body;

    let insertSql = `insert into newsletter(email) values('${email}')`

    conn.query(insertSql, (e, records) => {
        if (e){
            res.json({error: true, message: e.message})
        }
        else{
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // Use `true` for port 465, `false` for all other ports
                auth: {
                    user: "noormahal130505@gmail.com",
                    pass: process.env.DB_PASS,
                },
            });
            const mailOption = {
                from: "noormahal130505@gmail.com",
                to : `noormahal130505@gmail.com, '${email}'`,
                subject: "Email",
                text:'We have received your request, you have successfully signed up for monthly newsletter from our Cab Services'
            };
            transporter.sendMail(mailOption, (err, info) => {
                if (err) {
                    res.json({error: true, message: err.message})
                }
                else{
                    res.json({error: false, message: "Signed up successfully."})
                }
            })
        }
    })
}




// ADMIN
indexController.adminLogin = async (req,res)=>{
    res.render('admin/admin_homepage')
}

indexController.home3=async (req,res)=>{
    res.render('admin/admin_homepage')
}

indexController.home4=async (req,res)=>{
    res.render('admin/dashboard')
}

indexController.adminLoginAction = async (req,res)=>{
    try{
        // console.log(req.body)
        let {email,password} = req.body;
        let selectSql = `select * from admin_login where email='${email}' and password='${password}'`;
        // console.log(selectSql);
        conn.query(selectSql, (e,row) => {
            if(e)
                res.json({error:true,message:e.message})
            else
            {
                if(row.length > 0){
                    // let data = row[0];
                    sign({
                        "admin_id":row[0].admin_id,
                        "email":row[0].email,
                        "firstName":row[0].firstName,
                        "lastName":row[0].lastName,

                    },DB_SECRET,{expiresIn: '1d'},(e,token)=>{
                        if(e)
                            res.json({error: true, message: e.message})
                        else
                        {
                            // console.log(token)
                            res.cookie("jwtAdminToken", token, "1d");

                            res.json({error: false, message: "Logged in successfully",data : token})
                        }
                    })
                }
                else{
                    res.json({error: true, message: "Data not matched"});
                }
            }
        })
    }
    catch (e){
        // console.log(e)
    }
}

indexController.driver_information = async (req,res)=>{
    res.render('admin/driver_information')
}

indexController.forgot_password = async (req,res)=>{

    console.log('hello');
    res.render('admin/forgot_password');
}

indexController.Driver_form = async (req,res)=>{
    try {

        // console.log(req['jwtAdminInfo'])
        let {
            registeredNumber,
            name,
            brand,
            type,
            description,
            fuelType,
            rentWithDriver,
            rentWithoutDriver,
            colour,
            modelYear,
            ac,
            seater,
            transmission
        } = req.body;
        let {photo} = req.files;
        let selectSql = `select * from driver_information where registeredNumber='${registeredNumber}'`;
        conn.query(selectSql, (err, row) => {
            if (err)
                res.json({error: err, message: err.message});
            else {
                if (row.length > 0) {
                    res.json({error: true, message: "Car ID already exists"});
                } else {
                    let realPath = "public/images/driverPhotos/" + photo.name
                    let dbPath = "images/driverPhotos/" + photo.name
                    photo.mv(realPath, (err) => {
                        if (err) {
                            res.json({error: true, message: err.message})
                        } else {
                            let insertSql = `insert into driver_information(registeredNumber, name, brand, type, description, fuelType, 
                            rentWithDriver, rentWithoutDriver, colour, modelYear, ac, seater, transmission, photo)
                            values('${registeredNumber}','${name}','${brand}','${type}','${description}','${fuelType}','${rentWithDriver}',
                            '${rentWithoutDriver}','${colour}', '${modelYear}','${ac}','${seater}','${transmission}',
                            '${dbPath}')`

                            // console.log(insertSql)
                            conn.query(insertSql, (e) => {
                                if (e) {
                                    res.json({error: true, message: e.message})
                                } else {
                                    res.json({error: false, message: "Driver signed up successfully"})
                                }

                            })


                        }
                    })
                }
            }
        })
    }

    catch (e){
            // console.log(e)
        }
    }

indexController.View_information = async (req,res)=>{
    res.render('admin/View_information')
}

indexController.viewDrivers = async (req,res)=>{
    try {
        let selectSql = `select * from driver_information`;

        conn.query(selectSql, (e, rows) => {
            if (e) {
                res.json({error: true, message: e.message})
            } else {

                res.json({error: false, message: "Data fetched", records: rows})
            }
        })
    } catch (e) {
        res.json({error: true, message: e.message})
    }

}

indexController.viewDriverDetails = async (req, res) => {

    try {
        const {id} = req.params;
        let selectSql = `SELECT * FROM driver_information WHERE user_id = '${id}'`;
        // console.log(selectSql);
        conn.query(selectSql, (e, rows) => {
            if (e) {
                res.json({ error: true, message: e.message });
            } else if (rows.length > 0) {
                res.json({ error: false, message: "Data fetched", records: rows });
            } else {
                res.json({ error: true, message: "Driver not found" });
            }
        });
    } catch (e) {
        res.json({ error: true, message: e.message });
    }
}

indexController.change_password = async (req,res)=>{
    res.render('admin/change_password')
}

indexController.change_password_form = async (req,res)=>{

    let admin_id = req['jwtAdminInfo']['admin_id'];
    let{old_password, new_password, confirm_password} = req.body;
    // console.log(req.body)
    let selectSql = `select password from admin_login where admin_id='${admin_id}'`;
    // console.log(selectSql)
    conn.query(selectSql, (e, record) => {
        // console.log(record[0].password)
        // console.log(old_password)
        if (e) {
            res.json({error: true, message: e.message})
        }

        else {
            if (record[0].password === old_password)

                if (new_password !== confirm_password)
                    res.json({error: true, message: "Confirm password must be same as new password!"})

                else {
                    let updateSql = `UPDATE admin_login SET password = '${new_password}' WHERE admin_id='${admin_id}'`;

                    conn.query(updateSql, (e) => {
                        if (e) {
                            res.json({error: true, message: e.message})
                        } else {
                            res.json({error: false, message: "Passwords changed Successfully"})
                        }
                    })

                }
                else {
                    res.json({error: true, message: "Old Password does not match!"})
                }

        }
    })

}

indexController.updateInformation = async (req,res)=>{

    // console.log(req.body);
    console.log(req.files);
    let {
        editRegisteredNumber,
        editName,
        editBrand,
        editType,
        editDescription,
        editFuelType,
        editRentWithDriver,
        editRentWithoutDriver,
        editColour,
        editModelYear,
        editAC,
        editSeater,
        editTransmission
    } = req.body;

        let updateSql = `update driver_information set registeredNumber='${editRegisteredNumber}',name='${editName}',
                                brand='${editBrand}',type='${editType}',description='${editDescription}', fuelType='${editFuelType}', 
                                rentWithDriver='${editRentWithDriver}', rentWithoutDriver='${editRentWithoutDriver}',
                                colour='${editColour}', modelYear='${editModelYear}', ac='${editAC}', seater='${editSeater}',
                                transmission='${editTransmission}'
                                where registeredNumber='${editRegisteredNumber}'`


        // console.log(updateSql)

        conn.query(updateSql, (e) => {
            if (e)
                res.json({error: true, message: e.message})
            else
                res.json({error: false, message: "Data Updated"})
        })



}

indexController.delete_information = async (req,res)=>{

    try {

        console.log(req.params)

        const {id} = req.params;
        console.log(id)

        let delSql = `delete from driver_information where user_id='${id}'`
        console.log(delSql)

        conn.query(delSql, (e) => {
            if (e)
                res.json({error: true, message: e.message})
            else
                res.json({error: false, message: "Taxi deleted successfully"})

        })
    }
    catch (e){
        res.json({ error: true, message: e.message });
    }

}

indexController.forgot_password_form = async (req,res)=>{

    let{email} = req.body;
    console.log(email);
    let selectSql = `select email from admin_login where email='${email}'`;

    conn.query(selectSql, (e, record) => {
        // console.log(record[0].email);

        if (e) {
            res.json({error: true, message: "Wrong email entered"})
        }
        else{
            if (record[0] === undefined)
                res.json({error: true, message: "Wrong email entered"})
            else{
                // res.json({error: false, message: "Right email entered"})
                const randomCode =  Math.floor(100000 + Math.random() * 900000);
                Updatesql = `update admin_login set randomCode='${randomCode}' where email='${email}'`
                conn.query(Updatesql, (e) => {
                    if (e) {
                        res.json({error: true, message: e.message})
                    }
                    else{
                        const transporter = nodemailer.createTransport({
                            host: "smtp.gmail.com",
                            port: 587,
                            secure: false, // Use `true` for port 465, `false` for all other ports
                            auth: {
                                user: "noormahal130505@gmail.com",
                                pass: process.env.DB_PASS,
                            },
                        });
                        const mailOption = {
                            from: "noormahal130505@gmail.com",
                            to : "noormahal130505@gmail.com",
                            subject: "Email",
                            text:'Your OTP to change your password is ' + randomCode
                        };
                        transporter.sendMail(mailOption, (err, info) => {
                            if (err) {
                                res.json({error: true, message: err.message})
                            }
                            else{
                                res.json({error: false, message: "OTP sent"})
                            }
                        })
                    }
                })

            }
        }
    })
}

indexController.verify_otp = async (req,res)=>{
    // console.log(req.body)

    let {otp} = req.body
    console.log(otp)

    selectSql = `select randomCode from admin_login where randomCode='${otp}'`;

    conn.query(selectSql, (e) => {
        if (e) {
            res.json({error: true, message: e.message})
        }
        else{
            res.json({error: false, message: "Right OTP entered"})
            updateSql = `UPDATE admin_login SET randomCode = NULL WHERE randomCode = '${otp}'`;
            conn.query(updateSql, (e) => {
                if (e) {
                    res.json({error: true, message: e.message})
                }
            })
        }
    })
}

indexController.change_password_form2 = async (req,res)=>{
    let {email} = req.params
    console.log(email);
    let{new_password, confirm_password} = req.body;
    console.log(req.body)
    console.log(new_password)
    if (new_password === confirm_password) {
        let updateSql = `UPDATE admin_login SET password = '${new_password}' WHERE email='${email}'`;
        console.log(updateSql)

        conn.query(updateSql, (e) => {
            if (e) {
                res.json({error: true, message: e.message})
            } else {
                res.json({error: false, message: "Passwords changed Successfully"})
            }
        })
    }

    else {
        res.json({error: true, message: "Enter same password!"})
    }



}

module.exports = indexController;