const express = require('express')
require('./db/mongoose.js')
const User = require('./models/users')
const Task = require('./models/tasks')
const validator = require ('validator')
const app=express()
const port=process.env.PORT || 443
app.use(express.json())

app.post('/users', async (req,res)=>{
    const user = new User(req.body)

    try{
      await user.save()
      res.status(201).send(user)
    }catch (e){
      res.status(400).send(e)
    }

          
    })

    // user.save().then(()=>{
    //     res.status(201).send(user)
    //     console.log('Data added successfully!',user)
    // }).catch((error)=>{
    //     res.status(400).send(error)
    //     //res.send(error)
    //     console.log('Error!',error)
    // })
    // console.log(req.body)
    // res.send('Testing!')
  



  app.get('/users',async (req,res)=>{
    
    try {
      const users= await User.find({})
      res.send({users})
    }catch(e){
      res.status(500).send()
      console.log(e)
    }
    
    
    // User.find({}).then((users)=>{
    //     res.send(users)
    //     console.log(users)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    //     console.log('Error!',e)
    // })

  })
  app.get('/users/:id',async (req,res)=>{
    // console.log(req.params)
    const _id=req.params.id

    try{
      const user= await User.findById(_id)
      if(!user){
        return res.status(404).send('User not found')
      }
      res.send(user)
    } catch(e){
        res.status(500).send(e)
    } 
   
   
    //   User.findById(_id).then((user)=>{
    //    if(!user){
    //      return res.status(404).send('User not found')
    //    }
    //    res.send(user)
    //  }).catch((e)=>{
    //      res.status(500).send(e)
    //      //console.log('Error!',e)
    //  })
 
   })
   app.post('/tasks',(req,res)=>{
    const task = new Task(req.body)
    task.save().then(()=>{
        res.status(201).send(task)
        console.log('Data added successfully!',task)
    }).catch((error)=>{
        res.status(400).send(error)
        //res.send(error)
        console.log('Error!',error)
    })
    // console.log(req.body)
    // res.send('Testing!')
  })
  app.get('/tasks',(req,res)=>{
    Task.find({}).then((task)=>{
        res.send(task)
        console.log(task)
    }).catch((e)=>{
        res.status(500).send(e)
        console.log('Error!',e)
    })

  })



  app.get('/tasks/:id',(req,res)=>{
    // console.log(req.params)
    const _id=req.params.id
    
     Task.findById(_id).then((task)=>{
       if(!task){
         return res.status(404).send('Task not found')
       }
       res.send(task)
     }).catch((e)=>{
         res.status(500).send(e)
         //console.log('Error!',e)
     })
 
   })

app.listen(port,()=>{
    console.log('App is running on Port: '+port)
})
