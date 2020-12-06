const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const {welcomeMail, goodbyeMail} = require('../emails/account');
const router = new express.Router()


router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        welcomeMail(user.email,user.name);
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(file.originalname.match(/\.(jpg|jpeg|png)$/)){
          return  cb(undefined,true)
        }
        cb(new Error('Please upload correct format for a picture'))
    }
})
router.post('/users/me/avatar',auth, upload.single('avatar'), async (req,res)=>{
    const Buffer = await sharp(req.file.buffer).resize({width:300, height:250}).png().toBuffer();
    req.user.avatar=Buffer;
    await req.user.save();
    res.send("Photo Uploaded");
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.get('/users/:id/avatar', async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if( user && user.avatar ){
            res.set('Content-Type','image/png');
            res.send(user.avatar);
        }
        throw new Error('something went wrong');
    }catch(e){
        res.status(400).send(e);
    }

})

router.delete('/users/me/avatar', auth, async (req,res)=>{
    req.user.avatar=undefined;
    await req.user.save();
    res.send("Photo Deleted");
})


router.delete('/users/me', auth, async (req, res) => {
    try {
        const {email,name}=req.user;
        await req.user.remove()
        goodbyeMail(email,name);
        res.status(200).send(req.user)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

module.exports = router