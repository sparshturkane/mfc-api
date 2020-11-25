var express = require('express');
var router = express.Router();

const TransactionController = require('../controllers/transaction');

// Read transactions
router.get('/', TransactionController.list);

// Create Transactions
router.post('/', TransactionController.create);

// Update Transactions
router.patch('/:id', TransactionController.update);

// Delete Transactions
router.delete('/:id', TransactionController.delete);


module.exports = router;
