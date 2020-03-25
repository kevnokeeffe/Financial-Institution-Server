const jwt = require('jsonwebtoken')
let express = require('express')
let router = express.Router()
require('dotenv').config()

router.generateAccessJWT = user => {
  const tokenData = {
    fName: user.fName,
    lName: user.lName,
    id: user._id,
    email: user.email,
    financialInstitutionID: user.financialInstitutionID,
    IBAN: user.iban,
  }
  const token = jwt.sign(tokenData, process.env.SECRET_KEY_ACCESS, {
    expiresIn: 300000
  })
  return token
}

router.generateRefreshJWT = user => {
  console.log("here"+user)
  const tokenData = {
    fName: user.fName,
    lName: user.lName,
    id: user._id,
    email: user.email,
    financialInstitutionID: user.financialInstitutionID,
    IBAN: user.iban,
  }
  const token = jwt.sign(tokenData, process.env.SECRET_KEY_REFRESH, {
    expiresIn: 7776000000
  })
  return token
}

module.exports = router
