const mongoose = require('mongoose');

const currentAccountSchema = new mongoose.Schema({
    accountId: {type: String},
    userId: {type: String}, //fk
    accountType: {type: String},
    balance: {type: Number},
    overDraft: {type: Number},
    currency: {type: String},
    iban: {type: String}
    
},{ collection: 'current-account' });
currentAccountSchema.set('timestamps', true)
module.exports = mongoose.model('current-account', currentAccountSchema)