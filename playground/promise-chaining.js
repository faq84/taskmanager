require('../src/db/mongoose')
const User = require('../src/models/users')

//5d4b338c9250f113e49c7ea4

// User.findByIdAndUpdate(('5d4b3433808cbc4ff0c974fd'),{age:8}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age:8})
// }).then((result)=>{
//     console.log(result)
//     return result
// }).catch((e)=>{
//     console.log(e)
// })

const updateAgeandCount = async (id,age)=>{
    const user = await User.findByIdAndUpdate(id,{age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeandCount('5d4b3433808cbc4ff0c974fd',39).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})