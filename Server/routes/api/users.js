const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const bcryptjs = require('bcryptjs');
const uuidv1 = require('uuid/v1');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const dbmodel = require(path.join(__dirname,'..','..','/model','DBModel.js'));
const userModel = require(path.join(__dirname,'..','..','/model','User.js'));
const router = express.Router();
const fs = require('fs');
const logger = require('morgan');
const bodyparserjson = bodyParser.json();
const accessLogStream = fs.createWriteStream(path.join(__dirname,'..','..','/Log','server.log'),{flags:'a+'});
router.use(logger('combined',{stream:accessLogStream}));
const urlencodedparser = bodyParser.urlencoded({ extended: false });
const auth_key = require(path.join(__dirname,'/auth_keys','keys.js'));
const {check,body,validationResult } = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');
// Usage : API to get current user
// Access: Private
// API route : /api/users/currentUser
// Method: GET

router.get('/currentUser',passport.authenticate('jwt',{session:false}), (req,res) => {
    res.json({
       Status: 'Success',
        ErrorCode: '',
        ErrorDescription: '',
        ErrorDetail: '',
        user_id:req.user.user_id,
        firstName:req.user.firstName,
        lastName:req.user.lastName,
        usertype:req.user.usertype


    });
});


// Usage : API to create users
// Access: Public
// API route : /api/users/createUser
// Method: POST


router.post('/createUser',urlencodedparser,
    [check('firstName')
        .not().isEmpty().withMessage('firstname should not be empty')
        .isAlpha().withMessage('First Name should be alphabetical')
        .matches('^([^0-9]*)').withMessage('First Name should be only alphabets')
        .trim().escape(),
        sanitizeBody('firstName').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),
        check('lastName')
            .not().isEmpty().withMessage('lastname should not be empty')
            .isAlpha().withMessage('lastname should be alphabetical')
            .matches('^([^0-9]*)').withMessage('Last Name should be only alphabets')
            .trim().escape(),
        sanitizeBody('lastName').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),
        check('address_1')
            .not().isEmpty().withMessage('Address should not be empty')
            .matches('[A-Za-z0-9]+').withMessage('Address should  be alphanumeric')
            .escape(),
        sanitizeBody('address_1').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),
        check('address_2')
            .matches('[A-Za-z0-9]+').withMessage('Address should  be alphanumeric')
            .escape() ,
        sanitizeBody('address_2').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),
        check('city')
            .not().isEmpty().withMessage('city should not be empty')
            .matches('[A-Za-z0-9]+').withMessage('city should  be alphanumeric')
            .escape(),
        sanitizeBody('city').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),
        check('state')
            .not().isEmpty().withMessage('state should not be empty')
            .matches('[A-Za-z0-9]+').withMessage('state should  be alphanumeric')
            .escape(),
        sanitizeBody('state').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),
        check('county')
            .not().isEmpty().withMessage('county should not be empty')
            .matches('[A-Za-z0-9]+').withMessage('county should  be alphanumeric')
            .escape(),
        sanitizeBody('county').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),
        check('email')
            .not().isEmpty().withMessage('Email should not be empty')
            .trim().withMessage('Email should not have Spacing allowed between the characters')
            .escape().withMessage('Email should not have escape sequences allowed')
            .isEmail().normalizeEmail().withMessage('Email should be in proper format'),
        sanitizeBody('email').blacklist(['*','!','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','/','<','>']),
        check('zipCode')
            .not().isEmpty().withMessage('ZipCode should not be empty')
            .isLength({min:5,max:5}).withMessage('Zipcode should be of 5 digits')
            .isInt().withMessage('zipcode  should be in numeric format'),
        sanitizeBody('zipCode').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),
        check('password')
            .not().isEmpty().withMessage('Password should not be empty')
            .trim().withMessage('No Spacing allowed between the characters in password field')
            .escape().withMessage('No escape sequences allowed in password field')
            .matches(/(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9])(?=[^!@#\$%\^&\*\(\),\.\?\":\{\}|<>]*[!@#\$%\^&\*\(\),\.\?\":\{\}|<>]).{6,30}/,'i').withMessage('Password should contain at least one uppercase ,one lowercase ,one special character ,one number and should be between 6 to 30 characters'),

        check('password2')
            .not().isEmpty().withMessage('Password should not be empty')
            .trim().withMessage('No Spacing allowed between the characters in password field')
            .escape().withMessage('No escape sequences allowed in password field')
            .custom((value,{req}) =>{
                if (value !== req.body.password) {
                    throw Error('Passwords should match');
                }
                return true;
            } )

    ],
    (req,res) => {
        const errorsres = validationResult(req);
        if (!errorsres.isEmpty()) {
            const errorArray = errorsres.array();

            const {location,param,value,msg} = errorArray[0];
            res.status(400).json({
                Status: 'Failure',
                ErrorCode: '29',
                [param]: `${msg}`,
                ErrorDetail:''
            })
        }
    else{
        userModel.findOne({email_address: req.body.email})
            .then((result) => {
                if (result) {
                    console.log('Email already present');
                    res.status(400).json({
                        Status: 'Failure',
                        ErrorCode: '20',
                        email: 'Email/Username already present',
                        ErrorDetail: ''
                    });
                } else {
                    const url = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
                    var newUser = {
                        user_id: uuidv1(),
                        email_address: req.body.email,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        address_1: req.body.address_1,
                        address_2: req.body.address_2,
                        city: req.body.city,
                        state: req.body.state,
                        zipCode: req.body.zipCode,
                        county: req.body.county,
                        usertype: req.body.usertype,
                        avatar: url,
                        password: req.body.password
                    };
                    bcryptjs.genSalt(10)
                        .then((salt) => {

                            console.log(salt);
                            newUser.salt = salt;
                            return bcryptjs.hash(newUser.password, salt);


                        })
                        .then((hash, err) => {
                            if (!err) {
                                newUser.password = hash;
                                console.log(newUser);
                                let userobj = new userModel(
                                    {
                                        user_id: newUser.user_id,
                                        email_address: newUser.email_address,
                                        firstName: newUser.firstName,
                                        lastName: newUser.lastName,
                                        address_1: newUser.address_1,
                                        address_2: newUser.address_2,
                                        city: newUser.city,
                                        state: newUser.state,
                                        zipCode: newUser.zipCode,
                                        county: newUser.county,
                                        usertype: newUser.usertype,
                                        avatar: newUser.url,
                                        salt:newUser.salt,
                                        password: newUser.password
                                    }
                                );
                                userobj.save()
                                    .then((user) => {
                                        if(user){
                                            res.status(200).json({
                                                Status:'Success',
                                                ErrorCode: '',
                                                ErrorDescription: '',
                                                ErrorDetail: '',
                                                User:user
                                            })
                                        }
                                        else{
                                            res.status(400).json({
                                                Status: 'Failure',
                                                ErrorCode: '25',
                                                ErrorDescription: 'Cannot insert a user in the database.Please refer to ErrorDetail for more details',
                                                ErrorDetail: err
                                            });
                                        }
                                    })
                                    .catch(err => {
                                        res.status(400).json({
                                            Status: 'Failure',
                                            ErrorCode: '21',
                                            ErrorDescription: 'Cannot execute save on the user.Please refer ErrorDetail for more details.',
                                            ErrorDetail: err
                                        });
                                    })

                            } else {
                                res.status(400).json({
                                    Status: 'Failure',
                                    ErrorCode: '26',
                                    ErrorDescription: 'Error while creating hash for the password.Refer ErrorDetail field for more details.',
                                    ErrorDetail: err
                                })
                            }
                        })

                }
            })
            .catch(err => {
                res.status(400).json({
                    Status: 'Failure',
                    ErrorCode: '24',
                    ErrorDescription: 'Error occurred while executing query refer ErrorDetail field for more details',
                    ErrorDetail: err

                });
                })
    }
});

// Usage : API to login
// Access: Public
// API route : /api/users/login
// Method: POST

router.post('/login',urlencodedparser,[
    check('email')
        .not().isEmpty().withMessage('Email should not be empty')
        .trim().withMessage('Email should not have Spacing allowed between the characters')
        .escape().withMessage('Email should not have escape sequences allowed')
        .isEmail().normalizeEmail().withMessage('Email should be in proper format'),
    sanitizeBody('email').blacklist(['*','!','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','/','<','>']),


    check('password')
        .not().isEmpty().withMessage('Password')
        .trim().withMessage('No Spacing allowed between the characters in password field')
        .escape().withMessage('No escape sequences allowed in password field')

],(req,res) => {
    const errorsres = validationResult(req);
    if (!errorsres.isEmpty()) {
        const errorArray = errorsres.array();
        const {location,param,value,msg} = errorArray[0];
        res.status(400).json({
            Status: 'Failure',
            ErrorCode: '29',
            [param]: `${msg}`,
            ErrorDetail:''
        })
    }
    else {
        const email = req.body.email;
        const password = req.body.password;
        userModel.findOne({email_address: email}).then((result) => {
            if (!result) {
                res.status(400).json({
                    Status: 'Failure',
                    ErrorCode: '27',
                    email: 'email  not found.',
                    ErrorDetail: ''

                })
            } else {
                console.log('User found');
                // matching password
                bcrypt.compare(password, result.password).then((isMatch) => {
                    if (isMatch) { // if match then create a token
                        let payload = {
                            user_id: result.user_id,
                            firstName: result.firstName,
                            lastName: result.lastName,
                            email_address: result.email_address,
                            usertype: result.usertype
                        };
                        jwt.sign(payload, auth_key.key, {expiresIn: '1h'}, (err, token) => {
                            if (!err) {
                                res.status(200).json({
                                    Status: 'Success',
                                    ErrorCode: '',
                                    ErrorDescription: '',
                                    ErrorDetail: '',
                                    token: 'Bearer ' + token

                                })
                            } else {
                                res.status(400).json({
                                    Status: 'Failure',
                                    ErrorCode: '28',
                                    ErrorDescription: 'Error in creating a token.Please ErrorDetail field for more details',
                                    ErrorDetail: err

                                })
                            }


                        });
                    } else {
                        res.status(400).json({
                            Status: 'Failure',
                            ErrorCode: '28',
                            password: 'Password incorrect',
                            ErrorDetail: ''

                        });
                    }
                })
                    .catch((err) => {
                        res.status(400).json({
                            Status: 'Failure',
                            ErrorCode: '29',
                            ErrorDescription: 'Technical Failure.Please look at ErrorDetail for more details.',
                            ErrorDetail: err

                        });
                    })

            }
        })
            .catch((err) => {
                res.status(400).json({
                    Status: 'Failure',
                    ErrorCode: '24',
                    ErrorDescription: 'Error occurred while executing query refer ErrorDetail field for more details',
                    ErrorDetail: err

                });
            })

    }
});


module.exports = router;










