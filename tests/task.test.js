const request = require('supertest');
const Task = require('../src/models/task');
const app = require('../src/app');
const {userOne, userOneId, userTwo, userTwoId, taskOne, setupDB} = require('./fixtures/db');

beforeEach(setupDB);

test ('Should create new task for a user',async ()=>{
    const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description:"Watch and play Sports!"
    })
    .expect(201)

    const task = Task.findById(response.body._id);
    expect(task).not.toBeNull()
})

test ('Should get all tasks of a single user', async ()=>{
    const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200)

    expect(response.body.length).toEqual(2);
})

test ('Should not allow to delete usertwo to delete userone tasks', async()=>{
    await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .expect(404)
})