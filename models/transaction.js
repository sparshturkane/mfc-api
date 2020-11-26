const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    amount: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    user_id: { type: String, required: true }
})

module.exports = mongoose.model('Transaction', transactionSchema);