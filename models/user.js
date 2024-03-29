const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

userSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity
    });
  }
  const updatedCart = {
    items: updatedCartItems
  };
  this.cart = updatedCart;
  return this.save();
};

  userSchema.methods.deleteItemFromCart = function(productId){
    const updatedCart = this.cart.items.filter((prod)=>   productId.toString() !== prod.productId.toString())
    this.cart.items = updatedCart
    return this.save()
  }


  userSchema.methods.addOrder = function(){
          const order = this.cart.items
          this.cart.items = []
          return this.save()
  }

  userSchema.methods.clearCart = function() {
    this.cart = { items: [] };
    return this.save();
  };
  

module.exports = mongoose.model('User', userSchema);


// const {ObjectId} = require('mongodb')
// const getDb = require('../util/database').getDb;
// const Product = require('../models/product')

// class User {
//   constructor(name,email,cart,id){
//          this .name = name
//          this.email = email
//          this.cart = cart
//          this._id = id
//   }

//         save(){
//           const db = getDb()

//           return  db.collection('user').insertOne(this)
//                .then((res)=>{
//                 console.log(res)
//                })
//                .catch((error)=>{
//                 console.log(error)
//                })  
//         }

//          addToCart(product){
//               const cartProductIndex = this.cart.items.findIndex((cart)=>{
//                 return cart.productId.toString() == product._id.toString()
//               })
//               let newQuantity = 1;
//               const updatedCartItems = [...this.cart.items];
//                if(cartProductIndex >=0){
//                     newQuantity = this.cart.items[cartProductIndex].quantity +1 ;
//                     updatedCartItems[cartProductIndex].quantity = newQuantity
//                }
//                else{
//                 updatedCartItems.push({productId : new ObjectId(product._id),quantity : newQuantity})
//                }
              
               
//                const updatedcart = {
//                 items : updatedCartItems
//                }
//                const db = getDb()
//               return  db.collection('users').updateOne({_id :new  ObjectId(this._id)},{$set : {cart : updatedcart}})

//          }

//         static getUserById(userId){
//           const db = getDb()

//           return  db.collection('users').find({_id : new ObjectId(userId)}).next()
//                .then((user)=>{
//                 return user
//                })
//                .catch((error)=>{
//                 console.log(error)
//                })  
//         }

//         getCart(){
//             const db = getDb()
//             const productIds = this.cart.items.map((i)=>{
//               return i.productId
//             })
//             return db.collection('products').find({_id : {$in : productIds}}).toArray()
//                .then((products)=>{
//                  return products.map((pro)=>{
//                      return {...pro,quantity : this.cart.items.find((i)=>{
//                       return i.productId.toString() === pro._id.toString()
//                      }).quantity
//                     }
//                  })
//                })
//         }

//         deleteFromCart(prodId){
//                 const updatedCart = this.cart.items.filter((prod)=>   prodId.toString() !== prod.productId.toString())
//                 const db = getDb()
//                 return  db.collection('users').updateOne({_id :new  ObjectId(this._id)},{$set : {cart : {items :updatedCart}}})

//         }

//          addOrder(){
//           const db = getDb();
//           return this.getCart()
//             .then(products => {
//               const order = {
//                 items: products,
//                 user: {
//                   _id: new ObjectId(this._id),
//                   name: this.name
//                 }
//               };
//               return db.collection('orders').insertOne(order);
//             })
//             .then(result => {
//               this.cart = { items: [] };
//               return db
//                 .collection('users')
//                 .updateOne(
//                   { _id: new ObjectId(this._id) },
//                   { $set: { cart: { items: [] } } }
//                 );
//             });
//          }

//          getOrders() {
//           const db = getDb();
//          return db.collection('orders').find({'user._id' : new ObjectId(this._id)}).toArray()
//         }
// }

// module.exports = User;