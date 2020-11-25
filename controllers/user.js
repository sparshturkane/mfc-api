const User = require('../models/user')

exports.list = (req, res, next) => {
    User.find()
        .then(data => res.send(data))
        .catch(err => res.send(err));
}

exports.register = (req, res, next) => {
    const user = new User(req.body);
    user.save()
        .then(data => {
            console.log('then');
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            console.log("catch");
            res.send(err)
        })

}

exports.login = (req, res, next) => {
    res.send('login');
}