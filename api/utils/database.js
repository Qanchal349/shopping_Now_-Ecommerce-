const mongoose = require("mongoose");

function connectDatabase(){
    mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log("database connected")
   })
}



module.exports = connectDatabase;