let express = require('express')
let router = express.Router()
let User = require ('../../models/users/user-model')
let auth = require ('../../services/auth-service')
const bcrypt = require('bcryptjs')

router.refreshJWTLogin = (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const { email } = req.body
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).send(err, { message: 'User not found' })
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then(match => {
          if (!match) {
            return res.status(401).send({ auth: false, message:"Invalid Login",token: null })
          }
          const token = auth.generateRefreshJWT(user)
          return res
            .status(200)
            .send({ message: 'Login Successful', token: token })
        })
        .catch(err => {
          // where the error is!! Write down why next time!!!
          // Has something to do with running from the dist folder!
          // Sone sort of issue with the token assigning the data to it while returning it.
          // Solved by creating the token as a const signing it with all the data. then returning the token on it own aftr the signing.
          return res.status(409).send({ error: err })
        })
    })
    .catch(err => {
      if (err) {
        return res.status(401).send(err)
      }
      return res.status(401).send(err)
    })
}

router.accessJWTLogin = (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const { email } = req.body
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).send(err, { message: 'User not found' })
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then(match => {
          if (!match) {
            return res.status(401).send({ auth: false, token: null })
          }
          const token = auth.generateAccessJWT(user)
          return res
            .status(200)
            .send({ message: 'Login Successful', token: token })
        })
        .catch(err => {
          // where the error is
          return res.status(409).send({ error: err })
        })
    })
    .catch(err => {
      if (err) {
        return res.status(401).send(err)
      }
      return res.status(401).send(err)
    })
}

module.exports = router