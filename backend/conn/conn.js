const mongoose = require("mongoose")
require('dotenv').config()


const conn = async (req,res) => {
    await mongoose.connect(process.env.mongoDB_URL)
    .then(()=>{
        console.log(`Database connected successfully`)
    })
    .catch((err)=>{
        console.log(`Error occur during db connection : ${err}`)
    })
}
// module.exports = conn;
conn();