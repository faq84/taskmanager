const mongoose = require('mongoose')
const validator = require ('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./tasks')

//this process creates a middleware in between.
//which helps us to perform multiple functions pre and post the function is called.
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Email address is invalid')
            }
        }
    },
    age:{
        type: Number,
        default:0,
        validate(  value ){
            if (value<0){
                throw new Error('Age must be +ve Number')
            }
        }
    },
    password:{
        type: String,
        required: true,
        minlength:7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes("password") ){
                throw new Error('Password field cannot contain PASSWORD as a string')
            }
        }
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
},{
    timestamps:true
})

userSchema.virtual('task',{
    ref:'tasks',
    localField:'_id',
    foreignField:'author'
})

userSchema.statics.findByCredentials= async(email,password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    console.log(email)
    console.log(password)
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        //throw new Error('Unable to login')
    }
    return user
}


userSchema.methods.generateAuthToken = async function(){
    const user = this;
    //token expires in 7 seconds
    //const token = jwt.sign({_id:user._id.toString()},'thisismynewcourse',{expiresIn:'7 seconds'})
    const token = jwt.sign({_id:user._id.toString()},'thisismynewcourse',{expiresIn:'10 hours'})
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
    
    // console.log(token)
    // const data=jwt.verify(token,'thisismynewcourse')
    // console.log(data)
}
//Hash the plain text password before saving
userSchema.pre('save', async function(next){
    const user = this
    //console.log('just before saving!')
    if (user.isModified('password')){
        user.password= await bcrypt.hash(user.password,8)
    }

    next()

} )

userSchema.pre('remove', async function(next){
    const user = this;
    await Task.deleteMany({author:user._id})
    
    next()
})

userSchema.methods.toJSON= function (){
    const user = this;
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens

    return userObject
}

//userSchema.post()
const User = mongoose.model('User',userSchema)

module.exports = User