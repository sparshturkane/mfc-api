var express = require('express');
var router = express.Router();

// Read transactions
router.get('/', function (req, res, next) {
    res.send('read');
});

// Create Transactions
router.post('/', function (req, res, next) {
    res.send('create');
});

// Update Transactions
router.patch('/:id', function (req, res, next) {
    res.send('update');
});

// Delete Transactions
router.delete('/:id', function (req, res, next) {
    res.send('delete');
});


module.exports = router;
