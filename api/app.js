const express = require("express");
const app = express();
const error = require("./middleware/error")
const cookie = require("cookie-parser")
const bodyParser = require("body-parser")
const fileupload = require("express-fileupload")
const cors = require('cors')


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
//app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookie())
app.use(fileupload())
app.use(cors())  


// add cloudinary 



// import all routes 
// product route 
const productRoute = require("./routes/productRoute")
const userRoute = require("./routes/userRoute") 
const review = require("./routes/ReviewsRoute")
const order = require('./routes/orderRoute')

app.use("/api/v1",productRoute)
app.use("/api/v1",userRoute)
app.use("/api/v1",review)
app.use('/api/v1',order) 

app.use(error) 

module.exports = app; 