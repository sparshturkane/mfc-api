const Transaction = require('../models/transaction');

exports.list = (req, res, next) => {

    Transaction.find({ user_id: res.locals.decoded._id })
        .then(data => {
            res.send({
                status: true,
                data: data,
                msg: "Transaction fetched successfully"
            });
        })
        .catch(err => transactionError(err, res));
}

exports.create = (req, res, next) => {

    const transaction = new Transaction({
        customerName: req.body.customerName,
        amount: req.body.amount,
        description: req.body.description,
        type: req.body.type,
        user_id: res.locals.decoded._id,
    })

    transaction.save()
        .then((data) => {

            Transaction.find({ user_id: res.locals.decoded._id })
                .then(data => {
                    res.send({
                        status: true,
                        data: data,
                        msg: "Transaction added successfully"
                    });
                })
                .catch(err => transactionError(err, res));


        })
        .catch(err => transactionError(err, res))
}

exports.update = (req, res, next) => {
    // Auth
    // Validate Data
    // find and update where (user_id == _id) && transaction._id == id
    // console.log(req.params.transactionId);
    const query = { _id: req.params.transactionId }
    const update = {
        "$set": {
            customerName: req.body.customerName,
            amount: req.body.amount,
            description: req.body.description,
            type: req.body.type,
        }
    };
    Transaction.findOneAndUpdate(query, update)
        .then(data => {

            Transaction.find({ user_id: res.locals.decoded._id })
                .then(data => {
                    res.send({
                        status: true,
                        data: data,
                        msg: "Transaction added successfully"
                    });
                })
                .catch(err => transactionError(err, res));

        })
        .catch(err => transactionError(err, res))
}

exports.delete = (req, res, next) => {
    res.send('delete');
}

function transactionError(err, res) {
    res.send({
        status: false,
        error: err,
        msg: "Transaction adding failed"
    })
}