const mongoose = require('mongoose')
mongoose.Promise = global.Promise
require('dotenv').config()

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_DB}:${process.env.MONGO_PASSWORD}@harmoney-server-q4jlk.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('Successfully Connected to [ ' + db.name + ' ]'))
    .catch(err => console.log('Unable to Connect to [ ' + db.name + ' ]' + ' on all routes', err))
let db = mongoose.connection

module.exports = mongoose