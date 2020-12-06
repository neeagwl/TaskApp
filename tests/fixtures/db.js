const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id:userOneId,
    name:"Mike",
    email:"mikecheck123@yahoo.com",
    password:"what!!567",
    tokens:[{
        token: jwt.sign({_id:userOneId},process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id:userTwoId,
    name:"Mechelle",
    email:"moondrama@yahoo.com",
    password:"what!!567@@",
    tokens:[{
        token: jwt.sign({_id:userTwoId},process.env.JWT_SECRET)
    }]
}

const taskOne ={
    _id: new mongoose.Types.ObjectId(),
    description:"Complete your research on simulation theory.",
    completed:false,
    owner:userOne._id //userOneId
}

const taskTwo ={
    _id: new mongoose.Types.ObjectId(),
    description:"get chores done",
    completed:true,
    owner:userOne._id //userOneId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description:"Hey you get your ass abck inside.",
    completed: false,
    owner:userTwoId
}

const setupDB = async ()=>{
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
}

module.exports = {
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    taskOne,
    setupDB
}