const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let _db;

const mongoConnect = (callback) =>{
    MongoClient.connect('mongodb+srv://prajwalmajjigi:yHqFHUAjG6am9J6E@cluster0.ijwck5e.mongodb.net/shop?retryWrites=true&w=majority')
    .then((res)=>{
      console.log('connected')
      _db = res.db()
      callback()
    })
    .catch((error)=>{
      console.log(error)
    })

}


const getDb = ()=>{
     if(_db){
        return _db
     }
     throw 'no dtabase'
}

exports.mongoConnect = mongoConnect

exports.getDb = getDb






