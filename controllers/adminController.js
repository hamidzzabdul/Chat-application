const jwt= require('jsonwebtoken')
const {promisify} = require('util')
const User = require('../models/UserModel')

const signtoken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statusCode, res)=>{
    const token = signtoken(user.id)
    const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
      };

      res.cookie('jwt', token, cookieOptions)
    //   remove password from the output
    user.password = undefined;
    
    res.status(200).json({
        status: 'Success',
        token,
        data: {
            user
        }
    })
}

exports.signUp = async(req,res, next)=> {
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            role: req.body.role
        })
        createSendToken(user, 200, res)
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
    
}


exports.loginUser = async(req,res, next)=>{
    try{
        const {email, password} = req.body;

    if(!email || !password){
        return res.status(404).json({
            message: 'Please enter email or password'
        });
    }
    const user = await User.findOne({email}).select('+password')

   createSendToken(user, 200, res)
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
    
}

exports.logout = (req, res, next)=> {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() +10 * 1000),
        httpOnly: true
    })
    res.status(200).json({status: 'Success'})
}


// protect middleware 
exports.protect = async(req, res, next)=>{
    // 1 get the token and check if it is there
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }else if(req.cookies.jwt){
        token= req.cookies.jwt
    }

    if(!token){
        return res.status(401).json({
            status: 'fail',
            message: 'You are not logged in! please log in to get access'
        })
    }

    // 2) verification of the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id)
    if(!currentUser){
        return res.status(401).json({
            status: 'fail',
            message: 'The user belonging to this token no longer exists'
        })
    }

    // 4) Checking if user changed password after token was issued

    // Grant access to protected route
    req.user = currentUser
    res.locals.user = currentUser
    next()
}


exports.isLoggedIn = async(req, res, next)=> {
    if(req.cookies.jwt){
        try {
            // verify token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
                )
            // check if user still exists
            const currentUser = await User.findById(decoded.id)
            if(!currentUser){
                return next()
            }
            // 3 check if user changed password

            // Theres is a logged in user
            res.local.user = currentUser
            return next()
        } catch (error) {
            return next()
        }
    }
}

exports.restrictTo = (...roles)=> {
    return(req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                status: 'fail',
                message: 'You are not authorised to access this route'
            })
        }
        next()
    }
}