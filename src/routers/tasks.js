const express = require('express')
const Task = require('../models/tasks')
const router = new express.Router()


router.post('/tasks',async (req,res)=>{
    const task = new Task(req.body)
    
    try {
      //await task.save()
      res.status(201).send(await task.save())
    }catch(e){
      res.status(400).send(e)
    }

})
  

router.get('/tasks', async (req,res)=>{

  try{
    //const task = 
    res.send(await Task.find({}))
  }catch(e){
    res.status(500).send(e)
  }
})

  router.get('/tasks/:id', async (req,res)=>{
    // console.log(req.params)
    const _id=req.params.id
    try {
      if (!_id){
        return res.status(404).send('ID not found')
      }
      const task= await Task.findById(_id)
      res.send(task)
    }catch (e){
      res.status(500).send(e)
    }
    
   })

router.patch('/tasks/:id',async (req,res)=>{
  const taskupdates =Object.keys(req.body)
  const taskAllowedValues=['description','completed']
  const isValidValues =taskupdates.every((tk)=>taskAllowedValues.includes(tk))
  if(!isValidValues){
    return res.status(400).send('Invalid values passed')
  }
  try{
    const task = await Task.findByIdAndUpdate(req.params.id)
    //const task = await Task.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators:true})
    taskupdates.forEach((update)=>task[update]=req.body[update])
    await task.save()
    if (!task){
      return res.status(404).send('no Data found to update')
    }
    res.send(task)
  }catch(e){
    res.status(400).send(e)
  }


})

router.delete('/tasks/:id',async (req,res)=>{

  try{
    const task=await Task.findByIdAndDelete(req.params.id)
    if (!task){
      return res.status(404).send('no data found to delete')
    }
    res.send(task)
  }catch(e){
    res.send(400).send(e)
  }

})

module.exports = router