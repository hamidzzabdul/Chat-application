const User = require('../models/UserModel')

exports.getAllusers= async(req, res, next)=>{
    try{
        const users = await User.find()

    res.status(200).json({
        status: 'success',
        results: user.length,
        data: {
            users
        }
    })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }

    
}
