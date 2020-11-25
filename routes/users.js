var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('list users');
});

router.post('/register', function(req, res, next) {
  res.send('register');
});

router.post('/login', function(req, res, next) {
  res.send('login');
});

module.exports = router;
