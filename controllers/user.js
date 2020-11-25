const User = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

exports.list = (req, res, next) => {
    User.find()
        .then(data => res.send(data))
        .catch(err => res.send(err));
}

exports.register = (req, res, next) => {

    // Check if user exists
    User.findOne({ email: req.body.email })
        .then((data) => {
            if (data) {
                // User already present
                res.send({
                    status: true,
                    data: {},
                    msg: "User with this email already present !"
                })
            } else {
                // Unique user insert!
                const hashPassword = bcrypt.hashSync(req.body.password, saltRounds);

                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashPassword
                });

                user.save()
                    .then(data => {

                        res.send({
                            status: true,
                            data: {
                                name: data.name,
                                email: data.email
                            },
                            msg: "User added successfully"
                        });
                    })
                    .catch(err => {
                        res.send({
                            status: false,
                            error: err,
                            msg: "User adding failed"
                        })
                    })
            }
        })
        .catch((err) => {
            res.send({ status: false, err, msg: "Find User failed" })
        })

}

exports.login = (req, res, next) => {
    res.send('login');
}