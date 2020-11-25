const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {

    if (req.headers.authorization) {

        const token = req.headers.authorization.split(" ")[1];

        if (token) {

        } else {
            invalidAuthorization(res);
        }

        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {

            if (err) {

                invalidAuthorization(res);

            } else {
                res.locals.decoded = decoded
                next();

            }

        });



    } else {

        invalidAuthorization(res);

    }

}

function invalidAuthorization(res) {
    console.log("invalidAuthorization");
    res.send({
        status: false,
        error: "Invalid authorization",
        msg: "Invalid authorization",
    });
}