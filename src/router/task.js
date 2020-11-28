const express = require("express");
const Task= require('../model/task');
const router = new express.Router();

router.post('/task',async (req,res)=>{
    const newTask = new Task(req.body);
    try{
        await newTask.save();
        res.status(201).send(newTask);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})

router.get("/tasks",async (req,res)=>{
    try{
        const tasks=await Task.find({});
        console.log(tasks);
        res.send(tasks);
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
})

router.get("/tasks/:id",async (req,res)=>{
    const _id=req.params.id;
    try{
        const task = await Task.findById(_id);
        if(!task){
            return res.status(400).send();
        }
        console.log(task);
        res.send(task);
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
})

router.patch("/tasks/:id", async (req,res)=>{
    try{
    const user = await Task.findByIdAndUpdate(req.params.id,req.body,{ runValidators: true, new: true})
    if(!user){
        return res.status(404).send();
    }
    console.log(user);
    res.send(user);
    }catch(e){
        console.log(e);
        res.status(400).send();
    }

})

router.delete("/tasks/:id", async (req,res)=>{
    try{
        const task= await Task.findByIdAndDelete(req.params.id);
        if(!task){
            res.status(400).send();
        }
        console.log(task);
        res.send(task);
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
})

module.exports=router;