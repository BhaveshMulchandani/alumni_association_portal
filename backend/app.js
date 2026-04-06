const express = require('express')
const app = express()
const ConnectToDb = require('./db/db')
const indexroutes = require("./routes/index.routes")
const userroutes = require("./routes/user.routes")
const postroutes = require('./routes/post.routes')
const jobroutes = require('./routes/job.routes')
const mentorshiproutes = require('./routes/mentorship.routes')
const sessionroutes = require('./routes/session.routes')
const chatroutes = require('./routes/chat.routes')
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
app.use("/post",postroutes)
app.use("/job",jobroutes)
app.use("/mentorship",mentorshiproutes)
app.use("/session",sessionroutes)
app.use("/chat",chatroutes)


app.listen(3000)