const mongoose = require('mongoose');

const FISchema = new mongoose.Schema({
    userID: {type: String}, //fk
    fiName: {type: String},
    fiAddress: [{
        number:{type: String},
        eircode:{type: String},
        street:{type: String},
        city:{type: String},
        country:{type: String},
    }],
    accounts:[{
        accountID: {type: String}, //fk
    }],
    fiType:{type: String},
    uploadDate: {type: Date, default: Date.now}
},{ collection: 'financial-institutions' })
FISchema.set('timestamps', true)
module.exports = mongoose.model('financial-institution',FISchema)
