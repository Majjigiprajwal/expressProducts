const mongodb = require('mongodb')
const getDb = require('../util/database').getDb;

class User {
  constructor(name,email,address){
         this .name = name
         this.email = email
         this.address = address
  }

        save(){
          const db = getDb()

          return  db.collection('user').insertOne(this)
               .then((res)=>{
                console.log(res)
               })
               .catch((error)=>{
                console.log(error)
               })  
        }

        static getUserById(userId){
          const db = getDb()

          return  db.collection('users').find({_id : new mongodb.ObjectId(userId)}).next()
               .then((user)=>{
                return user
               })
               .catch((error)=>{
                console.log(error)
               })  
        }
}

module.exports = User;