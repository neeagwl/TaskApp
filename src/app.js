// "C:\Program Files\MongoDB\Server\4.4\bin\mongo.exe"
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const Task =require("./models/task");
const User = require('./models/user');

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports= app;
