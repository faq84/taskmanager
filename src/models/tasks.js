const mongoose = require('mongoose')
require('../db/mongoose')
//const validator = require ('validator')
const taskSchema = new mongoose.Schema({
    description:{
        type: String,
        required:true,
        trim:true
    },
    completed:{
        type: Boolean,
        default:false
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    }
})

taskSchema.pre('save',async function(next){
    const task = this
    console.log('before running save')
    next()
})
const task = mongoose.model('tasks', taskSchema)


module.exports = task