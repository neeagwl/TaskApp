const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const {userOne, userOneId, setupDB} = require('./fixtures/db');

beforeEach(setupDB);

test('Should sign up a new user',async()=>{
   const response = await request(app).post('/users').send({
        name:"Andrew",
        email:"andrew2211@gmail.com",
        password:"mypass222!!"
    }).expect(201)
    //assertion about database changed
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    //assertion about response object
    expect(response.body).toMatchObject({
        user:{
            name:'Andrew',
            email:"andrew2211@gmail.com",
        },
        token:user.tokens[0].token
    })

    //assertion about hashed password
    expect(user.password).not.toBe('mypass222!!')

})

test('Should login existing user',async()=>{
    const response = await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password
    }).expect(200)

    //assertion about correct second token after login
    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token)
})


test('Should not login a non existent user', async()=>{
    await request(app).post('/users/login').send({
            email:userOne.email,
            password:"hello0987!"
    }).expect(400)
})

test ('Should get users profile', async ()=>{
    await request(app)
    .get('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test ('Should not get profile for unauthenticated user', async ()=>{
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test ('Should delete users profile', async ()=>{
    await request(app)
    .delete('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    //assertion that user is deleted from database
    const user = await User.findById(userOneId);
    expect(user).toBeNull()
})

test ('Should not delete profile for unauthenticated user', async ()=>{
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test ('Should upload avatar image', async()=>{
    await request(app)
    .post("/users/me/avatar")
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','tests/fixtures/profile-dummy.jpg')
    .expect(200)

    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test ('Should update a existing user', async ()=>{
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name:"Joye"
    })
    .expect(200)

    const user = await User.findById(userOneId);
    expect(user.name).toBe('Joye');
})

test('Should not update invalid user fields', async()=>{
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        location:"India"
    })
    .expect(400)
})