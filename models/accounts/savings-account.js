const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    fiName: {type: String},
    accountName: {type: String},
    accountId: {type: String},
    accountNumber: {type: String},
    userId: {type: String}, //fk
    bankId: {type:String}, //fk
    accountType: {type: String},
    balance: {type: Number},
    currency: {type: String},
    iban: {type: String},
    dueDate: {type: String},
    
},{ collection: 'savingsAccount' })
accountSchema.set('timestamps', true)
module.exports = mongoose.model('savingsAccount', accountSchema)
