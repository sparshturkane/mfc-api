var express = require('express');
var router = express.Router();

const TransactionController = require('../controllers/transaction');
const { auth } = require('../middlewares/login_validation');
const { transactionValidationRules, validateTransaction } = require('../middlewares/request_validation');

router.get('/', auth, TransactionController.list);

router.post('/', auth, transactionValidationRules(), validateTransaction, TransactionController.create);

router.patch('/:id', auth, TransactionController.update);

router.delete('/:id', auth, TransactionController.delete);


module.exports = router;
