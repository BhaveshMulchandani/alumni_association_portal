const express = require('express')
const app = express()
const ConnectToDb = require('./db/db')
const indexroutes = require("./routes/index.routes")
const userroutes = require("./routes/user.routes")
const cookieparser = require('cookie-parser')
const cors = require('cors')

app.use(cors({
  origin:[ 'http://localhost:5173', 'http://localhost:5174' ], 
  credentials: true               
}));
app.use(express.json())
app.use(cookieparser())


ConnectToDb()

app.use("/",indexroutes)
app.use("/user",userroutes)


app.listen(3000)