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

app.get("/", (req, res) => {
    res.render("login")
})

app.get("/register", (req, res) => {
    res.render("register")
})

//this registers the user
app.post("/register", async (req, res) =>{
    const data = {
        email: req.body.email,
        password: req.body.password
    }

    //check if user exsist
    const duplicateUser = await collection.findOne({email: data.email})

    if(duplicateUser){
        res.send("User email already exists.")
    } else{
        //hash the user password using bcrypt
        const hashP = 10
        const hashedP = await bcrypt.hash(data.password, hashP)

        //replace password with hashed password
        data.password = hashedP 
        const userdata = await collection.insertMany(data)
        console.log(userdata)
    }

})


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

app.listen(5501, () => {
    console.log("Server running port: 5501")
})
