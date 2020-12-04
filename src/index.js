// "C:\Program Files\MongoDB\Server\4.4\bin\mongo.exe"
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const Task =require("./models/task");
const User = require('./models/user');

const app = express()
const port = process.env.PORT || 3000

const main= async ()=>{
    // const task =  await Task.findById('5fc4a586cf46cf09f883cdae');
    // await task.populate('owner').execPopulate();
    // console.log(task.owner);
    const user = await User.findById('5fc4a37d79d6990d6c960490');
    await user.populate('tasks').execPopulate();
    console.log(user.tasks)
}

// main();


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
