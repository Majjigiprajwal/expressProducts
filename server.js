const path = require('path');


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');

const errorController = require('./controllers/error')





const app = express();

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user');
// const expenseRouter = require('./routes/expense');

const User = require('./models/user')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// app.use((req,res,next)=>{
//       User.getUserById('65bd21d1e693b14cc69ac262')
//          .then((user)=>{
//           req.user = new User(user.name,user.email,user.cart,user._id)
//           console.log(res)
//           next()
//          })
//          .catch((error)=>{
//           console.log(error)
//          })
// })

app.use('/admin', adminRoutes);
app.use(shopRoutes);
// app.use(userRoutes);
// app.use(expenseRouter);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://prajwalmajjigi:yHqFHUAjG6am9J6E@cluster0.ijwck5e.mongodb.net/shop?retryWrites=true&w=majority'
  )
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });




