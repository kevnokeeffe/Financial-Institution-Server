let express = require('express');
let router = express.Router()
let accountController = require('../controllers/accounts/account-controllers')
let auth = require('../middleware/authenticate')
// Create a current account
router.post('/create-current',  accountController.createCurrentAccount)
// Create a savings account
router.post('/create-savings', accountController.createSavingsAccount)
// Read all current accounts
router.get('/find-current-all', auth.verifyRToken, accountController.indexCurrentAccount)
// Read all savings accounts
router.get('/find-savings-all', auth.verifyRToken, accountController.indexSavingsAccount)
// Read one individual current account by id
router.get('/find-current-individual/:id', auth.verifyRToken, accountController.showIndividualCurrentAccount)
// Read one individual current account by IBAN
router.get('/find-current-individual/iban/:iban', accountController.showIndividualCurrentAccountIBAN)
// Read one individual savings account by id
router.get('/find-savings-individual/:id', auth.verifyRToken, accountController.showIndividualSavingsAccount)
// Read one individual savings account by IBAN
router.get('/find-savings-individual/iban/:iban', accountController.showIndividualSavingsAccountIBAN)

// Get all current account transaction details
router.get('/get-transactions-current',  accountController.getAllTransactionCurrent)
// Get all savings account transaction details
router.get('/get-transactions-savings',  accountController.getAllTransactionSavings)

// Current Account Balance Updating Routes
router.post('/update-current-account-with/:id',auth.verifyRToken, accountController.updateTheCurrentAccount)
router.post('/update-current-account-add/:iban',accountController.updateCurrentAccountAdd)

// Savings Account Balance Updating Routes
router.post('/update-savings-account-with/:id',auth.verifyRToken, accountController.updateTheSavingsAccount)
router.post('/update-savings-account-add/:iban',accountController.updateSavingsAccountAdd)

// Delete specific current account by id
router.delete('/delete-current-account/:id', auth.verifyRToken, accountController.removeCurrentAccount)
// Delete specific savings account by id
router.delete('/delete-savings-account/:id', auth.verifyRToken, accountController.removeSavingsAccount)

module.exports = router;
