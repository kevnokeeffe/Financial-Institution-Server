const mongoose = require('mongoose')
// const validator = require('validatorjs')
const bcrypt = require('bcryptjs')

const User = new mongoose.Schema({
  fName: {
    type: String
  },
  lName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    trim: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    // validate: {
    //   validator: validator.isEmail,
    //   message: '{VALUE} is not a valid email!'
    // }
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
})

User.set('timestamps', true)

User.pre('save', function(next) {
  let user = this

  if (!user.isModified('password')) {
    return next()
  }
  bcrypt.genSalt(12, (err, salt) => {
    if (err) {
      return Promise.reject(err)
    }
    bcrypt.hash(user.password, salt, (err, hashedPassword) => {
      user.password = hashedPassword
      next()
    })
  })
})

module.exports = mongoose.model('User', User)