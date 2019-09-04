const express = require('express')
const User = require('../models/users')
const auth = require('../middleware/auth')
const sharp = require('sharp')
const router = new express.Router()
const multer = require('multer')
const mail= require('../email/account')

router.post('/users', async (req,res)=>{
    const user = new User(req.body)

    try{
      await user.save()
      mail.sendWelcomeEmail(user.email,user.name)
      //sendWelcomeEmail(user.email, user.name)
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
    mail.userLoginEmail(user.email, user.name)
    res.send({ user, token})
  }catch(e){
    res.status(400).send()
  }
})
// mail.sendWelcomeEmail
// mail.userDeletionEmail
// mail.userUpdateEmail
// mail.sendDeleteTokenEmail
router.post('/users/logout',auth ,async (req,res)=>{
  // console.log(req.user.tokens)

  // req.user.tokens.filter((token)=>{
  //   console.log(token.token)
  // })
  // console.log(req.token)
  try{
    req.user.tokens = req.user.tokens.filter((token)=>{
      
      return token.token !== req.token
    })
    
    await req.user.save()
    
    res.send()
  }catch(e){
    res.status(500).send()
  }
})

router.post('/users/logoutAll',auth, async(req,res)=>{
  try{
    req.user.tokens = []
    mail.sendDeleteTokenEmail(req.user.email,req.user.name)
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

    router.patch('/users/',auth, async(req,res)=>{
      const userupdates=Object.keys(req.body)
      const userallowedValues = ['name','email','age','password']
      const isValidValues = userupdates.every((update)=>userallowedValues.includes(update))
      if(!isValidValues){
        return res.status(400).send('Invalid Values passed to update!')
      }
      try{
        //const user = await User.findByIdAndUpdate(req.user._id)
        userupdates.forEach((update)=>req.user[update] = req.body[update])
        await req.user.save()
        if (!user){
          return res.status(404).send('no Data found to update')
        }
        res.send(req.user)
      }catch(e){
        res.status(400).send(e)
      }
    })
 //User Update original Route
// router.patch('/users/:id', async (req,res)=>{
//   //putting extra conditions for validating that only valid inputs are sent as part of body.
//   //take the input in updates variable for the items being sent for patching.
//   const userupdates=Object.keys(req.body)
//   //putting down the list of all allowed variables for users
//   const userallowedValues = ['name','email','age','password']
//   //putting down the list of all values available in the updates object recieved from body and return 
//   //false if anyone or all donot match. if all matches then it will return false.
//   //updates.every is basically function of express, where it will run till all the objects have been 
//   //parsed so the condition follows by validating every component in updates object with allowed values!!
//   const isValidValues = userupdates.every((update)=>userallowedValues.includes(update))
//   //condition to validate the values recieved from body, if they dont match, then it will return with
//   //message and function will end.
//   if(!isValidValues){
//     return res.status(400).send('Invalid Values passed to update!')
//   }
//   try{
//     const user = await User.findByIdAndUpdate(req.params.id)
//     //This line basically bypasses the 
//     //const user =  await User.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators:true})
//     userupdates.forEach((update)=>user[update] = req.body[update])
//     await user.save()
//     if (!user){
//       return res.status(404).send('no Data found to update')
//     }
//     res.send(user)
//   }catch(e){
//     res.status(400).send(e)
//   }
   
// }) 


//Original Delete Function when passing ID
// router.delete('/users/:id', async(req,res)=>{

//   try{
//     const user =await User.findByIdAndDelete(req.params.id)

//     if(!user){
//       return res.status(404).send()
//     }
//     res.send(user)
//   }catch(e){
//     res.status(500).send(e)
//   }


// })
const upload = multer({
  
  limits:{
    fileSize:1000000
  },
    fileFilter(req,file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please Upload a jpg or jpeg or png images!'))
        }
        cb(undefined,true)
        // cb(new Error('File must be '))
        // cb(undefined,true)
        // cb(undefined,false)

    }

})

router.post('/users/avatar',auth,upload.single('avatar'),async(req,res)=>{

  //req.user.avatar = req.file.buffer
  const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
  req.user.avatar = buffer
  await req.user.save()
  res.send()
},(error, req,res, next)=>{
  res.status(400).send({error: error.message})
})

router.delete('/users/avatar',auth, async(req,res)=>{
  try{
    req.user.avatar = undefined
    await req.user.save()
    res.send('Avatar deleted successfuly!')
  }
  catch(e){
    res.status(500).send(e)
  }
})

router.get('/users/:id/avatar',async(req,res)=>{
    
  try{
    const user = await User.findById(req.params.id)

    if (!user || !user.avatar){
      throw new Error ('')
    }
    res.set('Content-Type','image/png')
    res.send(user.avatar)

  }catch(e){
    res.status(404).send()

  }
  
})

router.delete('/users/', auth, async (req,res)=>{
  try{
    req.user.remove()
    mail.userDeletionEmail(req.user.email,req.user.name)
    res.send(req.user)
  }catch(e){
    res.status(500).send(e)
  }
})
module.exports=router