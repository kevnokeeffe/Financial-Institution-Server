const jwt = require('jsonwebtoken')
let express = require('express')
let router = express.Router()
let FI = require ('../models/financial-institution/financial-institution')

router.generateAccessJWT = user => {
  const tokenData = {
    fName: user.fName,
    lName: user.lName,
    id: user._id,
    email: user.email,
  }
  return (token = jwt.sign(tokenData, process.env.SECRET_KEY_ACCESS, {
    expiresIn: 300000
  }))
}

router.generateRefreshJWT = user => {
  const tokenData = {
    fName: user.fName,
    lName: user.lName,
    id: user._id,
    email: user.email,
  }
  return (token = jwt.sign(tokenData, process.env.SECRET_KEY_REFRESH, {
    expiresIn: 7776000000
  }))
}

module.exports = router
