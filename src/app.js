const express = require('express')
const bcrypt = require('bcryptjs')
require('./db/mongoose.js')

const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')

const app=express()


// {
//     lastvisit:null
//     util
// }


//Uploading Image to server
//========================================
// const multer = require('multer')
// const upload = multer({
//     dest:'images',
//     limits:{
//         fileSize:1000000
//     },
//     fileFilter(req,file, cb){
//         if(!file.originalname.match(/\.(doc|docx|jpg)$/)){
//             return cb(new Error('Please Upload a word Document!'))
//         }
//         cb(undefined,true)
//         // cb(new Error('File must be '))
//         // cb(undefined,true)
//         // cb(undefined,false)

//     }
// })


// app.post('/upload',upload.single('uploadfile'),(req,res)=>{
//     res.send()
// }, (error, req, res, next)=>{
//     res.status(400).send({error: error.message})
// })
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//MASTER SWITCH To Enable and Disable services
//=================================================
// app.use((req,res,next)=>{

//     // console.log(req.method, req.path)
//     // next() 
//     if(envStatus === false ){
        
//             res.status(503).send('POST/GET/PATCH/DELETE requests are disabled')
        
//     }else{
//         if(req.method === 'GET' || req.method === 'PATCH' || req.method ==='DELETE'){
//             res.status(400).send('GET/PATCH/DELETE requests are disabled')
//         }
//          else{   
//              next()
//         }
// }
   
// })

///Adding file update to Express.!!!!
//=====================================================






//Password Encryption example using bcyrpt library
//=====================================================
// const myfunc=async ()=>{
//   const pass='mypassword'
//   const hashpass=await bcrypt.hash(pass,8)
//   console.log(pass)
//   console.log(hashpass)
//   const isMatch = await bcrypt.compare('mypassword','$2a$08$9TxBexSjsy4QKiBj81rNLuqMuoUgzb/k/VgNvebgly66qH9NXJ1eG')
//   console.log(isMatch)
// }

// myfunc()

//JWT Token example for generate Json Web token
//==================================================
// const jwt = require('jsonwebtoken')

// const myfunc = async()=>{
//     const token = jwt.sign({_id:'abcd123'},'thisismynewcourse',{expiresIn:'7 seconds'})
//     console.log(token)
//     const data=jwt.verify(token,'thisismynewcourse')
//     console.log(data)
// }
// myfunc()
// //Base64 Json string                            Base64 Encoded (payload/body) contains the id'abcd123'  signature used to verify the token
// //part1{eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9}.part2{eyJfaWQiOiJhYmNkMTIzIiwiaWF0IjoxNTY1OTYwMzM3fQ}.part3{qh8LZF-AbfT7_AL9QR8kyve_E7bG5xqqwlwaNty6cd4}


// const pet = {
//     name : 'Hal'
// }

// pet.toJSON = function(){
//     console.log(this)
//     return this
// }
// console.log(JSON.stringify(pet))

// const Task = require ('./models/tasks')
// const User = require('./models/users')

// const main = async ()=>{
//     // const task = await Task.findById('5d598bcd788beb0e04a6fc36')
//     // await task.populate('author').execPopulate()
//     // console.log(task.author)
//     const user = await User.findById('5d5af89e95437a20f0e07047')
//     await user.populate('task').execPopulate()
//     //console.log(user.task )

// }

// main()

// app.listen(port,()=>{
//     console.log('App is running on Port: '+port)
// })

module.exports=app