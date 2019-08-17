const mongoose = require('mongoose')
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
    }
})

taskSchema.pre('save',async function(next){
    const task = this
    console.log('before running save')
    next()
})
const task = mongoose.model('tasks', taskSchema)


module.exports = task