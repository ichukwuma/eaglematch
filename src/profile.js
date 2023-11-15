const express = require('express')
const path = require("path")
const bcrypt = require("bcrypt")


//use apps 
const app = express()

//convert data into JSON method
app.use(express.json())

app.use(express.urlencoded({extended: false}))

//use ejs to for the view engine
app.set('view engine', 'ejs')

//static folder for out login-register file
app.use(express.static("public"))

// type localhost:5501/page in your browser and this should pop up page
app.get("/profile", (req, res) => {
    res.render("profile")
})



//port we're listning on
app.listen(5501, () => {
    console.log("Server running port: 5501")
})
