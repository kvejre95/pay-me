const mongoose = require("mongoose")
require('dotenv').config();
mongoose.connect(process.env.DB_URI)

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const User = new mongoose.model("User", userSchema)

// Create a Schema for Accounts
const accountSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    balance: {type: Number, required: true}
})

const Account = new mongoose.model("Account", accountSchema)


module.exports = {User, Account} 