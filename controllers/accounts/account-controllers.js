let express = require('express')
let router = express.Router()
let CAccount = require('../../models/accounts/current-account')
let SAccount = require('../../models/accounts/savings-account')
let User = require('../../models/users/user-model')
let moment = require('moment')
let Bank = require('../../models/financial-institution/financial-institution')
let BankAccountC = ''
let BankAccountS = ''
const axios = require('axios')

// Find all Current Accounts
router.indexCurrentAccount = async (req, res) => {
  await CAccount.find({}, (error, caccount) => {
    if (error) {
      return res.send({ message: false })
    }
    return res.status(200).send({ account: caccount[0] })
  })
}

// Find all Savings Accounts
router.indexSavingsAccount = async (req, res) => {
  await SAccount.find({}, (error, saccount) => {
    if (error) {
      return res.send({ message: false })
    }
    return res.status(200).send({ account: saccount[0] })
  })
}

router.createCurrentAccount = (req, res) => {
  // create current account
  Bank.findOne({ fiName: req.body.fiName }, (error, account) => {
    if (error) {
      return res.status(501).send({ message: 'No Account Available' })
    }
    BankAccountC = account._id
  })
  User.findOne({ _id: req.body._id }, (error, user) => {
    if (error && !user) {
      return res.status(500).send({ message: 'No Account Available' })
    }
    const currentAccount = new CAccount({
      fiName: req.body.fiName,
      userId: req.body.userId, //fk
      bankId: BankAccountC, //fk
      accountType: req.body.accountType,
      balance: req.body.balance,
      overDraft: req.body.overDraft,
      currency: req.body.currency,
      iban: req.body.iban,
    })
    // currentAccount.userId = user._id
    currentAccount.creationDate = moment(currentAccount.creationDate)

    currentAccount.save((error) => {
      if (error) {
        return res.status(500).send({ message: 'No Account Available' })
      }
      return res.status(201).send({ message: true })
    })
  })
}

router.createSavingsAccount = (req, res) => {
  Bank.findOne({ _id: req.body.bankId }, (error, account) => {
    if (error) {
      return res.status(501).send({ message: 'No Account Available' })
    }
    BankAccountS = account._id
  })
  User.findOne({ _id: req.body._id }, (error, user) => {
    if (error && !user) {
      return res.status(500).send({ message: 'No Account Available' })
    }
    const createSavings = new SAccount({
      fiName: req.body.fiName,
      userId: req.body.userId, //fk
      bankId: this.BankAccountS, //fk
      accountType: req.body.accountType,
      balance: req.body.balance,
      accountName: req.body.accountName,
      accountNumber: req.body.accountNumber,

      currency: req.body.currency,
      iban: req.body.iban,
    })
    createSavings.creationDate = moment(createSavings.creationDate)

    createSavings.save((error) => {
      if (error) {
        return res.status(500).send({ message: 'No Account Available' })
      }
      return res.status(201).send({ message: true })
    })
  })
}

// Update Current Account
router.updateCurrentAccount = (req, res) => {
  const id = req.body.transaction[1]

  const currentAccount = req.body.currentAccount
  currentAccount.userId = user._id
  currentAccount.dueDate = moment(currentAccount.dueDate)
  CAccount.findByIdAndUpdate({ _ID: id }, currentAccount, (error) => {
    if (error) {
      return res.status(500).send({ message: false })
    }
    return res.status(204).send({ message: true })
  })
}

// Update Savings Account
router.updateSavingsAccount = (req, res) => {
  //const id = req.body.iban
  User.findOne({ _id: id }, (error, user) => {
    if (error) {
      return res.status(500).send({ message: false })
    }
    if (!user) {
      return res.status(404).send({ message: false })
    }
    const savingsAccount = req.body.savingsAccount
    savingsAccount.userId = user._id
    savingsAccount.dueDate = moment(savingsAccount.dueDate)
    SAccount.findByIdAndUpdate(
      { _ID: savingsAccount._id },
      savingsAccount,
      (error) => {
        if (error) {
          return res.status(500).send({ message: false })
        }
        return res.status(204).send({ message: true })
      }
    )
  })
}

// Remove current account
router.removeCurrentAccount = (req, res) => {
  const id = 5
  CAccount.findOne({ _id: req.params.id }, (error, account) => {
    if (error) {
      return res.status(500).send({ message: false })
    }
    if (!account) {
      return res.status(404).send({ message: false })
    }
    //TODO Could be issues with id stuff here!!
    if (account.userId._id.toString() !== id) {
      return res.status(403).send({ message: false })
    }
    CAccount.deleteOne({ _id: req.params.id }, (error) => {
      if (error) {
        return res.status(500).send({ message: false })
      }
      return res.status(204).send({ message: true })
    })
  })
  return res.status(204).send({ message: true })
}

// Remove savings account
router.removeSavingsAccount = (req, res) => {
  const id = 5
  SAccount.findOne({ _id: req.params.id }, (error, account) => {
    if (error) {
      return res.status(500).send({ message: false })
    }
    if (!account) {
      return res.status(404).send({ message: false })
    }
    if (account.userId._id.toString() !== id) {
      return res.status(403).send({ message: false })
    }
    SAccount.deleteOne({ _id: req.params.id }, (error) => {
      if (error) {
        return res.status(500).send({ message: false })
      }
      return res.status(204).send({ message: true })
    })
  })
  return res.status(204).send({ message: true })
}

// Find one single current account by id
router.showIndividualCurrentAccount = (req, res) => {
  console.log(req.params.id)
  CAccount.findOne({ _id: req.params.id }, (error, account) => {
    if (error) {
      return res.send({ message: false })
    }
    if (!account) {
      return res.send({ message: false })
    }
    return res.status(200).send({ account: account, message: true })
  }) // maybe add a .populate
}

// Find one single current account by IBAN
router.showIndividualCurrentAccountIBAN = (req, res) => {
  CAccount.findOne({ iban: req.params.iban }, (error, account) => {
    if (error) {
      return res.send({ message: false })
    }
    if (!account) {
      console.log(false)
      return res.send({ message: false })
    }
    console.log(true)
    return res.status(200).send({ account: account, message: true })
  }).catch((error) => {
    return res.send({ message: false })
  })
}

// Find one single savings account by IBAN
router.showIndividualSavingsAccountIBAN = (req, res) => {
  SAccount.findOne({ iban: req.params.iban }, (error, account) => {
    if (error) {
      return res.send({ message: false })
    }
    if (!account) {
      return res.send({ message: false })
    }
    return res.status(200).send({ account: account, message: true })
  }).catch((error) => {
    return res.send({ message: false })
  })
}

// Find one single savings account by id
router.showIndividualSavingsAccount = (req, res) => {
  SAccount.findOne({ _id: req.params.id }, (error, account) => {
    if (error) {
      return res.send({ message: false })
    }
    if (!account) {
      return res.send({ message: false })
    }
    return res.status(200).send({ account: account, message: true })
  }) // maybe add a .populate
}

// Update current account balance
router.updateTheCurrentAccount = async (req, res) => {
  const data = req.body
  const id = req.body[1]
  const iban = req.body[0]
  await CAccount.findOne({ _id: id }, (error, account) => {
    if (error) {
      return res.send({ message: false })
    }
    if (!account || account === null) {
      return res.send({ message: false })
    }
    if (account) {
      let newBalance = account.balance - req.body[2]
      const updateBalance = account
      updateBalance.balance = newBalance
      CAccount.findByIdAndUpdate(
        { _id: account.id },
        updateBalance,
        (error) => {
          if (error) {
            return res.send({ message: false })
          }
        }
      ).then(async (resp) => {
        await axios
          .post(
            process.env.WIT_BANK_SERVER +
              '/api/account/update-current-account-add/' +
              iban,
            data
          )
          .then((response) => {
            if (response.data.message === true) {
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            return res.send({ message: false })
          })
        await axios
          .post(
            process.env.WIT_BANK_SERVER +
              '/api/account/update-savings-account-add/' +
              iban,
            data
          )
          .then((resp) => {
            if (resp.data.message === true) {
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            return res.send({ message: false })
          })
        await axios
          .post(
            process.env.AIB_BANK_SERVER +
              '/api/account/update-current-account-add/' +
              iban,
            data
          )
          .then((response) => {
            if (response.data.message === true) {
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            return res.send({ message: false })
          })
        await axios
          .post(
            process.env.AIB_BANK_SERVER +
              '/api/account/update-savings-account-add/' +
              iban,
            data
          )
          .then((resp) => {
            if (resp.data.message === true) {
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            return res.send({ message: false })
          })
        await axios
          .post(
            process.env.CREDIT_UNION_SERVER +
              '/api/account/update-current-account-add/' +
              iban,
            data
          )
          .then((response) => {
            if (response.data.message === true) {
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            return res.send({ message: false })
          })
        await axios
          .post(
            process.env.CREDIT_UNION_SERVER +
              '/api/account/update-savings-account-add/' +
              iban,
            data
          )
          .then((resp) => {
            if (resp.data.message === true) {
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            return res.send({ message: false })
          })
        await axios
          .post(
            process.env.AN_POST_SERVER +
              '/api/account/update-current-account-add/' +
              iban,
            data
          )
          .then((response) => {
            if (response.data.message === true) {
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            return res.send({ message: false })
          })
        await axios
          .post(
            process.env.AN_POST_SERVER +
              '/api/account/update-savings-account-add/' +
              iban,
            data
          )
          .then((resp) => {
            if (resp.data.message === true) {
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            return res.send({ message: false })
          })
      })
    }
  })
}

// Update savings account balance
router.updateTheSavingsAccount = async (req, res) => {
  const data = req.body
  const id = req.body[1]
  const iban = req.body[0]
  await SAccount.findOne({ _id: id }, (error, account) => {
    if (error) {
      return res.send({ message: false })
    }
    if (!account || account === null) {
      return res.send({ message: false })
    }
    if (account) {
      let newBalance = account.balance - req.body[2]
      const updateBalance = account
      updateBalance.balance = newBalance
      SAccount.findByIdAndUpdate(
        { _id: account.id },
        updateBalance,
        (error) => {
          if (error) {
            return res.send({ message: false })
          }
        }
      ).then(async (resp) => {
        await axios
          .post(
            process.env.WIT_BANK_SERVER +
              '/api/account/update-current-account-add/' +
              iban,
            data
          )
          .then((response) => {
            if (response.data.message === true) {
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            return res.send({ message: false })
          })
        await axios
          .post(
            process.env.WIT_BANK_SERVER +
              '/api/account/update-savings-account-add/' +
              iban,
            data
          )
          .then((response) => {
            if (response.data.message === true) {
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            return res.send({ message: false })
          })
        await axios
          .post(
            process.env.AIB_BANK_SERVER +
              '/api/account/update-current-account-add/' +
              iban,
            data
          )
          .then((response) => {
            if (response.data.message === true) {
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            return res.send({ message: false })
          })
        await axios
          .post(
            process.env.AIB_BANK_SERVER +
              '/api/account/update-savings-account-add/' +
              iban,
            data
          )
          .then((resp) => {
            if (resp.data.message === true) {
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            return res.send({ message: false })
          })
        await axios
          .post(
            process.env.CREDIT_UNION_SERVER +
              '/api/account/update-current-account-add/' +
              iban,
            data
          )
          .then((response) => {
            if (response.data.message === true) {
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            return res.send({ message: false })
          })
        await axios
          .post(
            process.env.CREDIT_UNION_SERVER +
              '/api/account/update-savings-account-add/' +
              iban,
            data
          )
          .then((resp) => {
            if (resp.data.message === true) {
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            return res.send({ message: false })
          })
        await axios
          .post(
            process.env.AN_POST_SERVER +
              '/api/account/update-current-account-add/' +
              iban,
            data
          )
          .then((response) => {
            if (response.data.message === true) {
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            return res.send({ message: false })
          })
        await axios
          .post(
            process.env.AN_POST_SERVER +
              '/api/account/update-savings-account-add/' +
              iban,
            data
          )
          .then((resp) => {
            if (resp.data.message === true) {
              return res.status(200).send({ message: true })
            }
          })
          .catch((error) => {
            return res.send({ message: false })
          })
      })
    }
  })
}

router.updateSavingsAccountAdd = (req, res) => {
  const iban = req.body[0]
  SAccount.findOne({ iban: iban }, (error, account) => {
    if (error) {
      return res.send({ message: false })
    }
    if (!account || account === null) {
      return res.send({ message: false })
    }
    if (account) {
      let newBalance = account.balance + req.body[2]
      const updateBalance = account
      updateBalance.balance = newBalance
      SAccount.findByIdAndUpdate(
        { _id: account.id },
        updateBalance,
        (error) => {
          if (error) {
            return res.send({ message: false })
          } else {
            return res.send({ message: true })
          }
        }
      )
    }
  })
}

router.updateCurrentAccountAdd = (req, res) => {
  const iban = req.body[0]
  CAccount.findOne({ iban: iban }, (error, account) => {
    if (error) {
      return res.send({ message: false })
    }
    if (!account || account === null) {
      return res.send({ message: false })
    }
    if (account) {
      let newBalance = account.balance + req.body[2]
      const updateBalance = account
      updateBalance.balance = newBalance
      CAccount.findByIdAndUpdate(
        { _id: account.id },
        updateBalance,
        (error) => {
          if (error) {
            return res.send({ message: false })
          } else {
            return res.send({ message: true })
          }
        }
      )
    }
  })
}

module.exports = router
