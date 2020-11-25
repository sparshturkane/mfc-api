var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user');
const { registerUserValidationRules, validateRegisterUser } = require('../middlewares/request_validation')

router.get('/', UserController.list);

router.post('/register', registerUserValidationRules(), validateRegisterUser, UserController.register);

router.post('/login', UserController.login);

module.exports = router;
