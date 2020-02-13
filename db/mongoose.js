const mongoose = require('mongoose')
mongoose.Promise = global.Promise
require('dotenv').config()

mongoose
    .connect(
        process.env.MONGO_DB_WIT_BANK_STRING, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('Successfully Connected to [ ' + db.name + ' ]'))
    .catch(err => console.log('Unable to Connect to [ ' + db.name + ' ]' + ' on all routes', err))
let db = mongoose.connection

module.exports = mongoose