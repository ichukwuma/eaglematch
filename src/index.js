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

    //check if user exsist
    const duplicateUser = await collection.findOne({email: data.email})
    if(duplicateUser){
        //res.send("User email already exists.")
        const alert = 'User email already exsist'
        res.render('register', {
            alert
        })
    } else{
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
