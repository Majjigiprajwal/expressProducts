const path = require('path');


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const errorController = require('./controllers/error')
const mongoConnect = require('./util/database').mongoConnect




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
app.use((req,res,next)=>{
      User.getUserById("65bd21d1e693b14cc69ac262")
         .then((user)=>{
          req.user = user
          console.log(res)
          next()
         })
         .catch((error)=>{
          console.log(error)
         })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
// app.use(userRoutes);
// app.use(expenseRouter);

app.use(errorController.get404);

mongoConnect(()=>{
  
   app.listen(3000)
})




