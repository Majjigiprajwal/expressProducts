const Expense = require('../models/expense');

exports.getExpenses = (req,res,next)=>{
    Expense.findAll()
     .then((result)=>{
        res.json(result);
     })
     .catch((err)=>{
        console.log(err);
     })
}

exports.postExpense = (req,res,next)=>{
    const description = req.body.description;
    const amount = req.body.amount;
    const category = req.body.category;
    Expense.create({
      description: description,
      amount : amount,
      category : category,
    })
      .then((result)=>{
         res.json(result)
      })
      .catch((err)=>{
        console.log(err)
      })
}

exports.deleteExpense = (req,res,next)=>{
    const expenseId =  req.params.id
    Expense.destroy({where :{id : expenseId}})
     .then((result)=>{
        res.status(200).json({})
     })
     .catch((err)=>{
        console.log(err);
     })
} 