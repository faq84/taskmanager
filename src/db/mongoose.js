const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false
})




// const tasks=new task({
//     description:"    ",
//     completed: true
// })

// const me = new User({
//     name:'   Muneeb   ',
//     age:9,
//     email:' muneeb@gmail.com ',
//     password:'password'
// })

// me.save().then(()=>{
// console.log(me)
// }).catch((error)=>{
//     console.log('Error',error)
// })
// tasks.save().then(()=>{
// console.log('Data added successfully', tasks)
// }).catch((error)=>{
//     console.log('Error!',error)
// })