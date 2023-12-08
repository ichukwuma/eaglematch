const express = require('express')
const path = require("path")
const bcrypt = require("bcrypt")
const collection = require("./config")

//use of body parser to store radio buttons maybe?
var bodyParser = require('body-parser'); 

const app = express()

//convert data into JSON method
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//urlencoded was previously set to false

//use ejs to for the view engine
app.set('view engine', 'ejs')

//static folder for out login-register file
app.use(express.static("public"))

//for images
app.use('/images', express.static('images'))

// type localhost:5501/login in your browser and this should pop up login
app.get("/login", (req, res) => {
    res.render("login")
})

// type localhost:5501/register in your browser and this should pop up register
app.get("/register", (req, res) => {
    res.render("register")
})

// type localhost:5501/home in your browser and this should pop up home
app.get("/about", (req, res) => {
    res.render("about")
})

// type localhost:5501/contact in your browser and this should pop up contact
app.get("/contact", (req, res) => {
    res.render("contact")
})

// type localhost:5501/faq in your browser and this should pop up faq
app.get("/faq", (req, res) => {
    res.render("faq")
})

// type localhost:5501/page in your browser and this should pop up page
app.get("/profile", (req, res) => {
    res.render("profile")
})

// type localhost:5501/home in your browser and this should pop up home
app.get("/home", (req, res) => {
    res.render("home")
})

// type localhost:5501/search in your browser and this should pop up search results page
app.get("/search", (req, res) => {
    res.render("search")
})

// type localhost:5501/settings in your browser and this should pop up settings
app.get("/settings", (req, res) => {
    res.render("settings")
})

// type localhost:5501/terms in your browser and this should pop up terms
app.get("/Terms", (req, res) => {
    res.render("Terms")
})


// type localhost:5501/notifications in your browser and this should pop up notifications
app.get("/notifications", (req, res) => {
    res.render("notifications")
})

// type localhost:5501/ in your browser and this should pop up landing
app.get("/", (req, res) => {
    res.render("landing")
})

//i dont think this is necessary since 
//it'll bring to page automatically after logging in
/*app.get("/tags", (req, res) => {
    res.render("tags")
})*/

//this registers the user
app.post("/register", async (req, res) =>{
    const data = {
        email: req.body.email,
        password: req.body.password,
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
    
    else if(passwordLengthCheck <= 7 ){
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

        const goToLogin = 'Nice, you are now registered! Click above to login!'
        res.render('register', {
            goToLogin
        })
        //res.render('tags')
        //res.render('login')
    }
})


 



//Login user
app.post("/login", async (req, res)=>{
        const checkUser = await collection.findOne({email: req.body.email})

        //compare hashpassword from our DB
        //this checks if it is right and brings to homepage
        const checkPassword = await bcrypt.compare(req.body.password, checkUser.password)

        if(!checkUser){
            const notUserAlert = 'User cannot be found'
            res.render('login', {
                notUserAlert
            })
        }

        else if(checkPassword){
          res.render('home')
        }
        
        else{
            const incorrectPasswordAlert = 'Incorrect password'
            res.render('login', {
               incorrectPasswordAlert
            })
            
        }
})

//updating user password here


app.post("/settings", async (req, res) => {
    try {
        //const { email, password, newPassword } = req.body;
       // console.log('Change Password Body:',
       const {currentPassword, newPassword} = req.body
    
        //const user = await collection.findOne({ email });
        const user = await collection.findOne({email: req.body.email})
        if (!user) {
            const notUser = 'Please enter your UNT Student Email'
            res.render('settings', {
                notUser 
            })
             //return res.status(404).json({ error: 'User not found' });
        }
        
        //const isPassCorrect = await bcrypt.compare(currentPassword, user.password);
        //const checkPassword = await bcrypt.compare(req.body.password, user.password)


        //checking password length
        else if(newPassword.length <= 7 ){
            const passwordLengthAlert = 'Please enter your new password with a minimum of 8 characters'
            res.render('settings', {
                passwordLengthAlert
            })
        }


        else{
            const numOfSaltRounds = 10;
            const hashedPassword = await bcrypt.hash(newPassword, numOfSaltRounds);

            user.password = hashedPassword;
            await user.save();

            const updatedPasswordSuccess = 'Password was updated successfully'
            res.render('settings', {
                updatedPasswordSuccess
            })
            //return res.json({ message: 'Password updated successfully' }); 
        }
    } catch (error) {
        console.error('Error in /settings:', error);
        res.status(500).json({ error: 'Issue with password' });
    }
});

       



//port we're listning on
app.listen(5501, () => {
    console.log("Server running port: 5501")
})
