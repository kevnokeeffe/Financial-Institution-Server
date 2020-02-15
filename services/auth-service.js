const jwt = require('jsonwebtoken')
let express = require('express')
let router = express.Router()
let FI = require ('../models/financial-institution/financial-institution')

router.generateAccessJWT = user => {
  const { email } = req.body
  FI.findOne({ email })
    .then(fi => {
      if (!fi) {
        return res.status(404).send(err, { message: 'Financial Institution not found' })
      }
  const tokenData = {
    fName: user.fName,
    lName: user.lName,
    id: user._id,
    email: user.email,
    fiName: fi.fiName,
    fiAddress: fi.fiAddress,
    accounts: fi.accounts,
    fiType: fi.fiType 
  }
  return (token = jwt.sign(tokenData, process.env.SECRET_KEY_ACCESS, {
    expiresIn: 300000
    
  }))
}).catch(err => {
  return res.status(409).send({ error: err })
})
}

router.generateRefreshJWT = user => {
  const tokenData = {
    fName: user.fName,
    lName: user.lName,
    id: user._id,
    email: user.email
  }
  return (token = jwt.sign(tokenData, process.env.SECRET_KEY_REFRESH, {
    expiresIn: 7776000000
  }))
}

module.exports = router
