let express = require('express')
let router = express.Router()
let StringUtil = require('../../utilities/string-util').StringUtil
let User = require ('../../models/users/user-model')
let auth = require ('../../services/auth-service')
const bcrypt = require('bcryptjs')

// Login User
router.refreshJWTLogin = (req, res) => {
    const validation = validateIndex(req.body)
    if(!validation.isValid){
        return res.status(400).json({ message: validation.message })
    }

    User.findOne({ email: req.body.email },(error, user) => {
        if (error) {
            return res.status(500).json({ message: 'tis fucked'})
        }

        if (!user) {
            return res.status(401).json()
        }
        const passwordMatch = User.passwordMatches(req.body.password, user.password)
        if (!passwordMatch){
            return res.status(401).json()
        }
        const token = auth.generateRefreshJWT(user)
        return res.status(200).json({ token: token })
    }).catch(err => {
        if (err) {
            return res.status(401).send(err)
        }
        return res.status(401).send(err)
    })
}

function validateIndex(body) {
    let errors = ''

    if (StringUtil.isEmpty(body.email)) {
        errors += 'E-mail is required'
    }

    if (StringUtil.isEmpty(body.password)) {
        errors += 'Password is required'
    }

    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
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