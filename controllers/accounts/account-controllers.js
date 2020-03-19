let express = require('express')
let router = express.Router()
let CAccount = require('../../models/accounts/current-account')
let SAccount = require('../../models/accounts/current-account')
let User = require('../../models/users/user-model')
let CurrentAccount = require ('../../models/accounts/current-account')
let SavingsAccount = require ('../../models/accounts/savings-account')
let moment = require ('moment')
let Bank = require('../../models/financial-institution/financial-institution')
let BankAccount = ''


// Find all Current Accounts
router.indexCurrentAccount = async (req, res) => {
  await CAccount.find({}, (error, account) => {
    if (error) {
      return res.status(501).send({message: "No Account Available"})
    }
    return res.status(200).send({ account:account})
  })
}

// Find all Savings Accounts
router.indexSavingsAccount = (req, res) => {
  SAccount.find({}, (error, account) => {
    if (error) {
      return res.status(500).json()
    }
    return res.status(200).send({ account:account})
  })
}

router.createCurrentAccount = (req, res) => {
  // create current account
  Bank.findOne({fiName: req.body.fiName}, (error, account) => {
    if (error) {
      return res.status(501).send({message: "No Account Available"})
    }
    console.log(account)
    BankAccount = account._id
    console.log(BankAccount)
  })
  User.findOne({_id: req.body._id}, (error, user) => {
    if(error && !user) {
      return res.status(500).json();
    }
    const currentAccount = new CAccount({
                fiName: req.body.fiName,
                userId: req.body.userId, //fk
                bankId: BankAccount, //fk
                accountType: req.body.accountType,
                balance: req.body.balance,
                overDraft: req.body.overDraft,
                currency: req.body.currency,
                iban: req.body.iban
              })
    // currentAccount.userId = user._id
    currentAccount.dueDate = moment(currentAccount.dueDate)

    currentAccount.save(error => {
      if(error) {
        return res.status(500).json()
      }
      return res.status(201).json()
    })
  })
}

router.createSavingsAccount = (req, res) => {
  // create savings account
  // const id = 10
  User.findOne({_id: req.body._id}, (error, user) => {
    if(error && !user) {
      return res.status(500).json();
    }
    const createSavings = new SAccount(req.body)
    createSavings.userId = user._id
    createSavings.dueDate = moment(createSavings.dueDate)

    createSavings.save(error => {
      if(error) {
        return res.status(500).json()
      }
      return res.status(201).json()
    })
  })
}

// Update Current Account
router.updateCurrentAccount = (req, res) => {
  const id = 10
  User.findOne({_id:id}, (error,user) => {
    if (error) {
      return res.status(500).json()
    }
    if (!user) {
      return res.status(404).json()
    }
    const currentAccount = req.body.currentAccount
    currentAccount.userId = user._id
    currentAccount.dueDate = moment(currentAccount.dueDate)
    CAccount.findByIdAndUpdate({_ID: currentAccount._id}, currentAccount, error => {
    if(error){
      return res.status(500).json()
    }
    return res.status(204).json()
  })
  })
}

// Update Savings Account
router.updateSavingsAccount = (req, res) => {
  const id = 10
  User.findOne({_id:id}, (error,user) => {
    if (error) {
      return res.status(500).json()
    }
    if (!user) {
      return res.status(404).json()
    }
    const savingsAccount = req.body.savingsAccount
    savingsAccount.userId = user._id
    savingsAccount.dueDate = moment(savingsAccount.dueDate)
    SAccount.findByIdAndUpdate({_ID: savingsAccount._id}, savingsAccount, error => {
    if(error){
      return res.status(500).json()
    }
    return res.status(204).json()
  })
  })
}

// Remove current account
router.removeCurrentAccount = (req, res) => {
  const id = 5;
  CAccount.findOne({_id: req.params.id}, (error, account) => {
    if(error){
      return res.status(500).json()
    }
    if(!account){
      return res.status(404).json()
    }
    //TODO Could be issues with id stuff here!! 
    if (account.userId._id.toString() !== id){
      return res.status(403).json({message: 'Not allowed to delete another user\'s account'})
    }
    CAccount.deleteOne({ _id: req.params.id}, error => {
      if(error) {
        return res.status(500).json()
      }
      return res.status(204).json()
    })
  })
  return res.status(204).json()
}

// Remove savings account
router.removeSavingsAccount = (req, res) => {
  const id = 5;
  SAccount.findOne({_id: req.params.id}, (error, account) => {
    if(error){
      return res.status(500).json()
    }
    if(!account){
      return res.status(404).json()
    }
    if (account.userId._id.toString() !== id){
      return res.status(403).json({message: 'Not allowed to delete another user\'s account'})
    }
    SAccount.deleteOne({ _id: req.params.id}, error => {
      if(error) {
        return res.status(500).json()
      }
      return res.status(204).json()
    })
  })
  return res.status(204).json()
}

// Find one single current account by id
router.showIndividualCurrentAccount = (req, res) => {
  CAccount.findOne({_id: req.params.id}, (error, account) => {
    if(error){
      return res.status(500).json()
    }
    if(!account) {
      return res.status(404).json()
    }
    return res.status(200).send({account: account})
  }) // maybe add a .populate
}

// Find one single savings account by id
router.showIndividualSavingsAccount = (req, res) => {
  SAccount.findOne({_id: req.params.id}, (error, account) => {
    if(error){
      return res.status(500).json()
    }
    if(!account) {
      return res.status(404).json()
    }
    return res.status(200).send({account: account})
  }) // maybe add a .populate
}
module.exports = router;
