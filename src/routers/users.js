const express = require('express')
const User = require('../models/users')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users', async (req,res)=>{
    const user = new User(req.body)

    try{
      await user.save()
      const token = await user.generateAuthToken()
      res.status(201).send({user,token})
    }catch (e){
      res.status(400).send(e)
    }
    })

router.get('/users',auth ,async (req,res)=>{
 
    // try {
    //   const users= await User.find({})
    //   if (users.length === 0){
    //     // throw new Error('No data in table')
    //     return res.status(204)
    //   }
    //   //console.log(users.length)
    //   res.send({users})
    // }catch(e){
    //   res.status(500).send()
    //   console.log(e)
    // }
    res.send(req.user)
 
  })


router.post('/users/login',async(req,res)=>{
  try{
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({user, token})
  }catch(e){
    res.status(400).send()
  }
})

router.post('/users/logout',auth ,async (req,res)=>{
  // console.log(req.user.tokens)

  req.user.tokens.filter((token)=>{
    console.log(token.token)
  })
  // console.log(req.token)
  try{
    req.user.tokens = req.user.tokens.filter((token)=>{
      
      return token.token === req.token
    })
    await req.user.save()
    res.send()
  }catch(e){
    res.status(500).send()
  }
})

router.get('/users/:id',async (req,res)=>{
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

    })
 
router.patch('/users/:id', async (req,res)=>{
  //putting extra conditions for validating that only valid inputs are sent as part of body.
  //take the input in updates variable for the items being sent for patching.
  const userupdates=Object.keys(req.body)
  //putting down the list of all allowed variables for users
  const userallowedValues = ['name','email','age','password']
  //putting down the list of all values available in the updates object recieved from body and return 
  //false if anyone or all donot match. if all matches then it will return false.
  //updates.every is basically function of express, where it will run till all the objects have been 
  //parsed so the condition follows by validating every component in updates object with allowed values!!
  const isValidValues = userupdates.every((update)=>userallowedValues.includes(update))
  //condition to validate the values recieved from body, if they dont match, then it will return with
  //message and function will end.
  if(!isValidValues){
    return res.status(400).send('Invalid Values passed to update!')
  }
  try{
    const user = await User.findByIdAndUpdate(req.params.id)
    //This line basically bypasses the 
    //const user =  await User.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators:true})
    userupdates.forEach((update)=>user[update] = req.body[update])
    await user.save()
    if (!user){
      return res.status(404).send('no Data found to update')
    }
    res.send(user)
  }catch(e){
    res.status(400).send(e)
  }
   
}) 

router.delete('/users/:id', async(req,res)=>{

  try{
    const user =await User.findByIdAndDelete(req.params.id)

    if(!user){
      return res.status(404).send()
    }
    res.send(user)
  }catch(e){
    res.status(500).send(e)
  }


})

module.exports=router