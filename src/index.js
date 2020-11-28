// "C:\Program Files\MongoDB\Server\4.4\bin\mongo.exe"
const express= require("express");
require('./db/mongoose');
const userRouter= require("./router/user");
const taskRouter = require("./router/task");

const app=express();
const port=process.env.PORT  || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.get("/",(req,res)=>{
    res.send("hello")
});

app.listen(port,()=>{
    console.log(`Server started on ${port}`);
})