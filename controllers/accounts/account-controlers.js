let express = require('express')
let router = express.Router()
let Account = require('../../models/accounts/current-account')

router.createCurrentAccount = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  Account.find({ id: req.body._id })
    .exec()
    .then(account => {
      if (account.length >= 1) {
        return res.status(422).json({ message: 'Account already exists!' })
      } else {
        const account = new Account({
          userId: req.body.userId, //fk
          accountType: req.body.accountType,
          balance: req.body.balance,
          overDraft: req.body.overDraft,
          currency: req.body.currency,
          iban: req.body.iban
        })

        account
          .save()
          .then(result => {
            res.status(200).send({ auth: true, message: 'Account Created' })
          })
          .catch(err => {
            res
              .status(500)
              .json({ message: 'Error Invalid Inputs', error: err })
          })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Invalid Inputs', error: err })
    })
}

module.exports = router;
