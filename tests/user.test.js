const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/users')


const userOne = {
    name:"Ken",
    email:"Kennan2020@gmail.com",
    password:"123ssddff"
}

beforeEach(async()=>{
await User.deleteMany()
await new User(userOne).save()
})




test('Should Login the new User', async () => {
    await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password
    }).expect(200)
})



test('Should Not Login', async () => {
    await request(app).post('/users/login').send({
        email:userOne.email,
        password:'thisisnotmypassword'
 }).expect(400)
})

test ('Should signup a new User', async () => {
    await request(app).post('/users').send({
        name:'Faizan',
        email:'faizanq@email.com',
        password:'Mypass777!'
    }).expect(201)
})


// afterEach(()=>{
//     console.log('after each')
// })