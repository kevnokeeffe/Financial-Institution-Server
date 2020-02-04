import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
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
    timeStamp: {type: Date, default: Date.now}
},{ collection: 'financial-institution-transaction' })
TransactionSchema.set('timestamps', true)
export default mongoose.model('financial-institution-transaction',TransactionSchema)