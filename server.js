const path = require('path');


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const errorController = require('./controllers/error')

const sequelize = require('./util/database');

const Product = require('./models/product');
const Newuser = require('./models/newuser');
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item');


const app = express();

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user');
const expenseRouter = require('./routes/expense');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next)=>{
  Newuser.findOne({where :{id :1}})
    .then((user)=>{
        req.user = user;
        next();
    })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(userRoutes);
app.use(expenseRouter);

app.use(errorController.get404);


Product.belongsTo(Newuser, { constraints: true, onDelete: 'CASCADE' });
Newuser.hasMany(Product);
Newuser.hasOne(Cart);
Cart.belongsTo(Newuser);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize.sync()
  .then((res)=>{
    return Newuser.findOne({where :{id :1 }})
  })
  .then((user)=>{
    if(!user){
     return  Newuser.create({
        name:'prajwal',
        email:'prajwal1233'
      })
    }
      return user
  })
  .then((user)=>{
   return  user.createCart();
  })
  .then((cart)=>{
    app.listen(7000);
  })
  .catch((err)=>{
    console.log(err)
  })



