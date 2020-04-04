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
    financialInstitutionID: user.financialInstitutionID
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
    financialInstitutionID: user.financialInstitutionID
  }

  let verifyOptions = {
		expiresIn:  7776000000
     }; 

  const token = jwt.sign(tokenData, process.env.SECRET_KEY_REFRESH, verifyOptions)
  return token
}

module.exports = router
