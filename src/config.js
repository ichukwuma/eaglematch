//creating database connection

const mongoose = require("mongoose")
const connect = mongoose.connect("mongodb://localhost:27017/eagle")

//check database connected or not
connect.then(()=>{
    console.log("database connected successfully")
})
.catch(() => {
    console.log("Database cannot be connected")
})

//user schema
const userSchema = new mongoose.Schema({
    email:{ 
        type:String,
        required:[true, "Email address field is empty"],
        unique:true,
        lowercase:true
        //match: [/^\w+([\.-]?\w+)*@[my.unt.edu]/, 'Please enter your UNT Student email address']
    },
    password:{
        type:String,
        required: [true, "Password field is empty"],
        minlength:[8, "Minimum password length is 8 characters"],
    }
})

//collection part
const collection = new mongoose.model("users", userSchema)

module.exports = collection
