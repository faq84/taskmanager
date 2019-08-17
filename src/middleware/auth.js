const jwt = require('jsonwebtoken')
const User = require('../models/users')

const auth  = async (req, res, next)=>{
    // console.log("auth middleware")
    // next()
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismynewcourse')
        const user = await User.findById({_id: decoded._id, 'tokens.token': token})
        // const tokenExp = decoded.exp
        // const date=Math.round(new Date().getTime()/1000 )
        // const currentSystemDate = new Date().toLocaleString()
        // const tokenExptoHumanReadable = new Date(tokenExp*1000).toLocaleString()
        //console.log(user)
        //console.log(decoded)
        //console.log(token)
        // if (tokenExp > date)
        // {
        //     console.log('Token still valid')
        // }
        // console.log(tokenExp)
        // console.log("Token Expiry date converted from EPOCH to human readable",tokenExptoHumanReadable)
        // console.log("Current System Date",currentSystemDate)
        if (!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    }catch(e)
    {
       res.status(401).send({error: 'Please Authenticate!'})
    }
}


//

module.exports = auth