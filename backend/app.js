const express = require("express");
const app  = express();
const cors = require('cors')
// mongodb connect
require('./conn/conn')

require('dotenv').config()
const PORT = process.env.PORT || 4000


const auth = require('./routes/auth')
const list = require('./routes/list')


app.use(express.json());
app.use(cors());


app.use("/api/v1",auth)
app.use("/api/v2",list)

app.get('/',(req,res)=>{
    const city="Londan";
    const country="England";
    const temp=24;
    res.send("<h1>Hello, The temperature in "+city+", "+country+" is "+temp+"</h1>");
})

app.listen(PORT,()=>{
    console.log(`Server running at port: ${PORT}`)
})