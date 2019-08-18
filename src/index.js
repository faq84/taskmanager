const express = require('express')
const bcrypt = require('bcryptjs')
require('./db/mongoose.js')

const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')
const envStatus = false
const app=express()
const port=process.env.PORT || 443

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
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// const myfunc=async ()=>{
//   const pass='mypassword'
//   const hashpass=await bcrypt.hash(pass,8)
//   console.log(pass)
//   console.log(hashpass)
//   const isMatch = await bcrypt.compare('mypassword','$2a$08$9TxBexSjsy4QKiBj81rNLuqMuoUgzb/k/VgNvebgly66qH9NXJ1eG')
//   console.log(isMatch)
// }

// myfunc()


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
app.listen(port,()=>{
    console.log('App is running on Port: '+port)
})

// const pet = {
//     name : 'Hal'
// }

// pet.toJSON = function(){
//     console.log(this)
//     return this
// }
// console.log(JSON.stringify(pet))