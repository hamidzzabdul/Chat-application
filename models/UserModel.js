const mongoose = require('mongoose')
const validator= require('validator')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Please enter a name']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter an email'],
        lowerCase: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please enter password'],
        minlength: 8,
        select: false
    },
    passwordConfirm:{
        type: String,
        required: [true, 'Please confirm password'],
        validate: function(el) {
            el === this.password
        },
        message: 'Passwords are not the same'
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    photo:{
        type: String,
        default: 'default.png'
    }
});

// hashing passwords before saving to db
userSchema.pre('save', async function(next){
    // hash the pass
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next()
})

userSchema.pre('save', function(next){
    this.name =
    this.name.trim()[0].toUpperCase() + this.name.slice(1).toLowerCase();
    next();
})

// comparing if password is correct
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}




const User = mongoose.model('User', userSchema);

module.exports = User;