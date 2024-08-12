const mongoose = require("mongoose")
const { mongoDB_URL } = require("../config")


const conn = async (req,res) => {
    await mongoose.connect(mongoDB_URL)
    .then(()=>{
        console.log(`Database connected successfully`)
    })
    .catch((err)=>{
        console.log(`Error occur during db connection : ${err}`)
    })
}
// module.exports = conn;
conn();