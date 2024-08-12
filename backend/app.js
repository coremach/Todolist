const express = require("express");
const app  = express();
const cors = require('cors')
// mongodb connect
require('./conn/conn')

const { PORT } = require("./config");
const auth = require('./routes/auth')
const list = require('./routes/list')


app.use(express.json());
app.use(cors());


app.use("/api/v1",auth)
app.use("/api/v2",list)

app.get('/',(req,res)=>{
    res.send("hello from ghghhhjkjjjh app.put")
})

app.listen(PORT,()=>{
    console.log(`Server running at port: ${PORT}`)
})