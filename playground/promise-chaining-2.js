require('../src/db/mongoose')
const Task = require('../src/models/tasks')


//5d4b239c9d9a8e34f4e8aac1
// Task.findByIdAndDelete('5d4b239c9d9a8e34f4e8aac1').then(()=>{
//     console.log('ID Deleted')
//     return Task.countDocuments({completed:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteTaskandCount = async (id)=>{
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed:false})
    return count

}

deleteTaskandCount('5d4d6bf1d4f0a124307ecd48').then((count)=>{
    console.log(count)
   // console.log(task)
}).catch((e)=>{
    console.log(e)
})