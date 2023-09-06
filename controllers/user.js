const User = require('../models/user');

exports.getUsers = (req,res,next)=>{
    User.findAll()
     .then((result)=>{
        res.json(result);
     })
     .catch((err)=>{
        console.log(err);
     })
}

exports.postUsers = (req,res,next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    User.create({
      name: name,
      email : email,
      address : address,
    })
      .then((result)=>{
         res.json(result)
      })
      .catch((err)=>{
        console.log(err)
      })
}

exports.deleteUser = (req,res,next)=>{
    const userId =  req.params.id
    User.destroy({where :{id : userId}})
     .then((res)=>{
        res.status(200).redirect('/users');
     })
     .catch((err)=>{
        console.log(err);
     })
}