const express = require('express')
const path = require("path")
const bcrypt = require("bcrypt")
const collection = require("./config")

const app = express()

//convert data into JSON method
app.use(express.json())


app.use(express.urlencoded({extended: false}))

//use ejs to for the view engine
app.set('view engine', 'ejs')

//static folder for out login-register file
app.use(express.static("public"))

// type localhost:5501/login in your browser and this should pop up login
app.get("/login", (req, res) => {
    res.render("login")
})

// type localhost:5501/register in your browser and this should pop up register
app.get("/register", (req, res) => {
    res.render("register")
})

//this registers the user
app.post("/register", async (req, res) =>{
    const data = {
        email: req.body.email,
        password: req.body.password
    }

    //check conditions for email and password when we register
    //check for dup user
   const duplicateUser = await collection.findOne({email: data.email})
   
   //check for email that doesn't end with @my.unt.edu
   var untEmailCheck = new RegExp(/^\w+([\.-]?\w+)*@[my.unt.edu]/)

   //check if password length is less than 8 characters
   const passwordLengthCheck = data.password.length

    //check if user exsist
    if(duplicateUser){
        //res.send("User email already exists.")
        const dupEmailAlert = 'User email already exsist'
        res.render('register', {
            dupEmailAlert
        })
    } 
    
    if(!data.email.match(untEmailCheck)){
        const notUNTEmail = 'Please register with your UNT Student Email'
        res.render('register', {
            notUNTEmail
        })
    }
    
    if(passwordLengthCheck <= 7 ){
        const passwordLengthAlert = 'Password requires a minimum of 8 characters'
        res.render('register', {
            passwordLengthAlert
        })
    }

    //else statement that will now store the students email and password (hashed) into the database
    else{
        const numOfSaltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, numOfSaltRounds)

        data.password = hashedPassword //this replaces og password with the hashed password

        const userdata = await collection.insertMany(data)
        console.log(userdata) 
    }
})

 


/*
//Login user
app.post("/login", async (req, res)=>{
    try{
        const checkUser = await collection.findOne({email: req.body.email})
        if(!check){
            res.send("User cannot be found")
        }

        //compare hashpassword from our DB
        const checkPassword = await bcrypt.compare(req.body.password, check.password)
        if(checkPassword){
            res.render("home")
        }else{
            res.send("Incorrect password")
        }
    }
    catch{
        res.send("wrong details")
    }

})

*/

//port we're listning on
app.listen(5501, () => {
    console.log("Server running port: 5501")
})
