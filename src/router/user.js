const express = require("express");
const User=require('../model/user');
const router = new express.Router();


router.get("/users",async (req,res)=>{
    try{
        const users= await User.find({});
        console.log(users);
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
    
})
router.get("/users/:id",async (req,res)=>{
    const _id=req.params.id;
    try{
        const user= await  User.findById(_id);
        if(!user){
            return res.status(400).send();
        }
        console.log(user);
        res.send(user);
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
})
router.post('/user',async (req,res)=>{
    const newUser= new User(req.body);
    try{
        await newUser.save();
        console.log(newUser);
        res.status(201).send(newUser)
    }catch(e){
        res.status(400).send(e);
    }
})

router.patch("/users/:id", async (req,res)=>{
    try{
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{ runValidators: true, new: true})
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

router.delete("/users/:id", async (req,res)=>{
    try{
        const user= await User.findByIdAndDelete(req.params.id);
        if(!user){
            res.status(400).send();
        }
        console.log(user);
        res.send(user);
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
})



module.exports= router;
