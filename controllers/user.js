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
    User.findOne({ email: req.body.email })
        .then((data) => {
            if (data) {
                console.log(data);
                var verifyPassword = bcrypt.compareSync(req.body.password, data.password);

                if (verifyPassword) {

                    const token = jwt.sign(
                        {
                            email: data.email,
                            _id: data._id,
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "1d"
                        }
                    );

                    res.send({
                        status: true,
                        data: {
                            name: data.name,
                            email: data.email,
                            authorizartion: token,
                        },
                        msg: "Success"
                    })


                } else {
                    res.send({
                        status: false,
                        error: "invalid password",
                        msg: "Invalid Email or Password",
                    });
                }
            } else {
                res.send({
                    status: false,
                    error: "invalid password",
                    msg: "Invalid Email or Password",
                });
            }

        })
        .catch((err) => {
            console.log(err);
            res.send({ status: false, error: err, msg: "Find user failed" })
        })
}