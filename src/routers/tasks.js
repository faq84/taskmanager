const express = require('express')
const Task = require('../models/tasks')
const router = new express.Router()
const auth = require('../middleware/auth')



router.post('/tasks',auth,async (req,res)=>{
    //const task = new Task(req.body)
    const task = new Task({
      ...req.body,
      author: req.user._id
    })
    try {
      //await task.save()
      res.status(201).send(await task.save())
    }catch(e){
      res.status(400).send(e)
    }

})
  
//GET /tasks?completed=true
//GET /tasks?limit1&skip=2
//GET /tasks?sortBy=createdAt_asc
router.get('/tasks', auth,async (req,res)=>{
  const match={}
  const sort={}
  if (req.query.completed){
    match.completed=req.query.completed==='true'
  }

  if(req.query.sortBy){
    const parts = req.query.sortBy.split('_')
    sort[parts[0]]=parts[1] === 'desc' ? -1 : 1

  }
  try{
    //const user = await User.findById({author:req.user._id})
    await req.user.populate({
      path:'task',
      match,
      options:{
        limit:parseInt(req.query.limit),
        skip:parseInt(req.query.skip),
        sort
      }
    }).execPopulate()
    //console.log(req.user.task )
    // const task = await Task.find({})
     res.send(req.user.task)
  }catch(e){
    res.status(500).send(e)
  }
})

  router.get('/tasks/:id',auth, async (req,res)=>{
    // console.log(req.params)
    const _id=req.params.id
    try {
      //const task= await Task.findById(_id)
      const task = await Task.findOne({_id, author:req.user._id})
      if (!task){
        return res.status(404).send('ID not found')
      }
      
      res.send(task)
    }catch (e){
      res.status(500).send(e)
    }
    
   })

router.patch('/tasks/:id',auth, async (req,res)=>{
  const taskupdates =Object.keys(req.body)
  const taskAllowedValues=['description','completed']
  const isValidValues =taskupdates.every((tk)=>taskAllowedValues.includes(tk))
  if(!isValidValues){
    return res.status(400).send('Invalid values passed')
  }
  try{
    const task = await Task.findOne({ _id:req.params.id, author: req.user._id})
    //const task = await Task.findByIdAndUpdate(req.params.id)
    //const task = await Task.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators:true})
    
    if (!task){
      return res.status(404).send('no Data found to update')
    }
    taskupdates.forEach((update)=>task[update]=req.body[update])
    await task.save()
    res.send(task)
  }catch(e){
    res.status(400).send(e)
  }


})

router.delete('/tasks/:id',auth, async (req,res)=>{

  try{
    //const task=await Task.findByIdAndDelete(req.params.id)
    const task = await Task.findOneAndDelete({_id: req.params.id, author: req.user._id})
    if (!task){
      return res.status(404).send('no data found to delete')
    }
    res.send(task)
  }catch(e){
    res.send(400).send(e)
  }

})

module.exports = router