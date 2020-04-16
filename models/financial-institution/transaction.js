const mongoose = require('mongoose');
const TransactionSchema = new mongoose.Schema({
    userID: {type: String},
    fiId: {type:String},
    accountType:{type:String},
    account_from_ID: {type: String}, //fk
    account_to_ID: {type: String}, //fk
    transactionType: {type: String},
    amount:{type: Number},
    description:{type: String},
    start_date:{type: String},
    endDate:{type: String},
    currency:{type: String},
    frequency:{type: String},
    transaction_code:{type: String},
    auth_code:{type: String},
    credit_debit:{type: String},
    currentBalance:{type: Number},
    accountID:{type: String},
    timeStamp: {type: Date, default: Date.now}
},{ collection: 'transaction' })
TransactionSchema.set('timestamps', true)
module.exports = mongoose.model('transaction',TransactionSchema)