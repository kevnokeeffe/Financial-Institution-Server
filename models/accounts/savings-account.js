const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    financialInstitutionID: {type: String}, //fk
    userId: {type: String}, //fk
    consentId: {type: String},
    refreshToken: {type: String},
    accessToken: {type: String, required: true},
    accountType: {type: String},
    permissions: [{
        readAccountsBasic: {type: Boolean},
        readAccountsDetail: {type: Boolean},
        readBalances: {type: Boolean},
        readBeneficiariesBasic: {type: Boolean},
        readBeneficiariesDetail: {type: Boolean},
        readDirectDebits: {type: Boolean},
        readProducts: {type: Boolean},
        readStandingOrderBasic: {type: Boolean},
        readStandingOrderDetail: {type: Boolean},
        readTransactionBasic: {type: Boolean},
        readTransactionCredits: {type: Boolean},
        readTransactionDebits: {type: Boolean},
        readTransactionDetail: {type: Boolean},
        readStatementBasic: {type: Boolean},
        readStatementDetail: {type: Boolean},
        readScheduledPpaymentsBasic: {type: Boolean},
        readScheduledPaymentsDetail: {type: Boolean},
        readPAN: {type: Boolean}
    }],
    authCode: {type: String},
    accountRequestID: {type: String},
    active: {type: Boolean},
    registered: {type: String},
    last_login: {type: String},
    dueDate: {type: String}
},{ collection: 'savings-account' })
accountSchema.set('timestamps', true)
module.exports = mongoose.model('savings-account', accountSchema)
