const {ObjectId} = require('mongodb')
const getDb = require('../util/database').getDb;
const Product = require('../models/product')

class User {
  constructor(name,email,cart,id){
         this .name = name
         this.email = email
         this.cart = cart
         this._id = id
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

         addToCart(product){
              const cartProductIndex = this.cart.items.findIndex((cart)=>{
                return cart.productId.toString() == product._id.toString()
              })
              let newQuantity = 1;
              const updatedCartItems = [...this.cart.items];
               if(cartProductIndex >=0){
                    newQuantity = this.cart.items[cartProductIndex].quantity +1 ;
                    updatedCartItems[cartProductIndex].quantity = newQuantity
               }
               else{
                updatedCartItems.push({productId : new ObjectId(product._id),quantity : newQuantity})
               }
              
               
               const updatedcart = {
                items : updatedCartItems
               }
               const db = getDb()
              return  db.collection('users').updateOne({_id :new  ObjectId(this._id)},{$set : {cart : updatedcart}})

         }

        static getUserById(userId){
          const db = getDb()

          return  db.collection('users').find({_id : new ObjectId(userId)}).next()
               .then((user)=>{
                return user
               })
               .catch((error)=>{
                console.log(error)
               })  
        }
}

module.exports = User;