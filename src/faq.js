//FAQ Page Javascript File

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

//static folder for FAQ file
app.use(express.static("public"))

// type localhost:5501/faq in your browser and this should pop up faq
app.get("/faq", (req, res) => {
    res.render("faq")
})


//port we're listening on
app.listen(5501, () => {
    console.log("Server running port: 5501")
})





//Light Dark Mode Toggle
function myFunction() {
  let element = document.body;
  element.classList.toggle("dark");
}


/* 

Add class to either body, main, heading, etc
// function myFunction() {
//   let element = document.body;
//   if(element.hasClass("light")){
//     element.classList.toggle("dark");
//   }else{
//     element.classList.toggle("light");
//   }
//  // element.classList.toggle("dark");
// }

/* <script>
$( ".change" ).on("click", function() {
    if( $( "body" ).hasClass( "dark" )) {
        $( "body" ).removeClass( "dark" );
        $( ".change" ).text( "OFF" );
    } else {
        $( "body" ).addClass( "dark" );
        $( ".change" ).text( "ON" );
    }
});
</script> */