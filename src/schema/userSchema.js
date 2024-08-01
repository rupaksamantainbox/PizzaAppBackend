const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : [true, "First name is required"],
        minlength : [5, "First name must be at least 5 Charecters"],
        lowercase : true,
        trim : true,
        maxlength : [20, "First name not be greater than 20 Charecters"]
    },
    lastName : {
        type : String,
        required : [true, "Last name is required"],
        minlength : [5, "Last name must be at least 5 Charecters"],
        lowercase : true,
        trim : true,
        maxlength : [20, "Last name not be greater than 20 Charecters"]
    },
    mobileNumber : {
        type : String,
        required : [true, "Phone number is required"],
        trim : true,
        unique : [true, "Phone number already in use"],
        maxlength : [10, "Phone number should be 10 Charecters"],
        minlength : [10, "Phone number should be 10 Charecters"]
    },
    email : {
        type : String,
        trim : true,
        require : [true, "Email Should be Provided"],
        unique : [true, "Email number already in use"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : {
        type : String,
        required : [true, "Password number is required"],
        minlength : [6, "Password must be at least 6 Charecters"],
    },
    role : {
        type : String,
        enum : ["USER", "ADMIN"],
        default : "USER"
    }
}, {timestamps : true})

userSchema.pre('save', async function () {
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword
})

const User = mongoose.model("User", userSchema);

module.exports = User;