// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient,ObjectID} = require('mongodb')
const id = "5d3f24b09e4a880ef4fab5ba"
// const id = new ObjectID()

// console.log(id.toHexString().length)
// //console.log(id.getTimestamp())
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL,{useNewUrlParser: true}, (error, client) => {
    if (error){
        return console.log('Unable to connect to Database: ' +databaseName )
    }
    const db = client.db(databaseName)
    // db.collection('users').updateOne(
    //     {
    //         _id: ObjectID(id)
    //     },
    //     {
    //     $inc:{
    //         age:1
    //     }
    // } ).then((result)=>
    // {
    //     console.log(result)
    // }).catch((error)=>
    // {
    //     console.log(error)
    // })
    // db.collection('tasks').updateMany(
    //     {
    //         completed:false
    //     },{
    //         $set:{
    //             completed:true
    //         }
    //     }
    // ).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
    db.collection('tasks').deleteOne({
        description:"Assignment2"
    }).then((result)=>{
        console.log(result.deletedCount)
    }).catch((error)=>{
        console.log(error)
    })

    // db.collection('users').deleteMany({
    //     name:"Faizan",
    //     gender: "Female"
    // }).then((result)=>{
    //     console.log(result.deletedCount)
    // }).catch((error)=>{
    //     console.log(error)
    // })
})
//     db.collection('tasks').findOne({_id:ObjectID(id)},(error,result)=>{
//          if (error){
//              return console.log('Data not found!')
//          }
         
//          console.log(result)
        
//         })
        
   
//    db.collection('tasks').find({completed:true}).toArray((error,task)=>{
//         // if(error){
//         //     return console.log('user not found with age 35')
//         // }
//         console.log(task)
//     })
    // db.collection('users').find({age:35}).count((error,count)=>{
    //     if(error){
    //         return console.log('user not found with age 35')
    //     }
    //     console.log(count)
    // })
    // const list = db.collection('users').find({age:35}).limit(1)
    //     // if(error){
    //     //     return console.log('user not found with age 35')
    //     // }
    //     console.log(list)
    
























    // db.collection('tasks').insertMany([
    //     {
    //         description:'Assignment1',
    //         completed: true
    //     },{
    //         description:'Assignment1',
    //         completed: false
    //     },{
    //         description:'Assignment1',
    //         completed: true
    //     }
    // ], (error,result)=>{
    //     if (error){
    //         return console.log("Error inserting to Table!")
    //     }
    //     console.log(result.ops)
    // })
    // db.collection('users').insertOne({
    //     _id: id,
    //     name:'Muneeb',
    //     age: 8,
    //     gender: 'Male'
    // },(error,result)=>{
    //     if (error){
    //         return console.log('Data Insertion error!')
    //     }
    //     console.log(result.ops)
    // })
