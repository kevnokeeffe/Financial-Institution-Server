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
    trim: true
  },
  password: {
    type: String,
    trim: true
  },
  financialInstitutionID: {
    type: String,
    trim: true
  } //fk
})

User.set('timestamps', true)
User.statics.passwordMatches = function(password, hash){
  return bcrypt.compareSync(password, hash)
}
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