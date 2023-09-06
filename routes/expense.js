const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();

router.get('/expenses', expenseController.getExpenses);

router.post('/expenses', expenseController.postExpense);


router.post('/expenses/:id',expenseController.deleteExpense)

module.exports = router;