const User = require('../models/UserModel')

exports.getOverview = async(req, res)=>{
    const users = await User.find()

    res.status(200).render('overview',{
        title: 'Home',
        users
    })
}
 
 exports.getLogin = (req, res)=>{
    res.status(200).render('login',{
        title: 'loginPage'
    });
 }
 exports.getSignUp = (req, res)=>{
    res.status(200).render('register',{
        title: 'loginPage'
    });
 }

