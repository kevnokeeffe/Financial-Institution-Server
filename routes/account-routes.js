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
// Update a spacific current account by id
router.put('/update-current-account/:id', auth.verifyRToken, accountController.updateCurrentAccount)
// Update a spacific current account by IBAN + funds
router.put('/update-current-account/iban/:iban', accountController.updateCurrentAccountIBAN)
// Update a current account by id - funds
router.put('/update-current-account/minus/:id', accountController.updateCurrentAccountMinus)
// Update a specific savings account by id
router.put('/update-savings-account/:id', auth.verifyRToken, accountController.updateSavingsAccount)
// Delete specific current account by id
router.delete('/delete-current-account/:id', auth.verifyRToken, accountController.removeCurrentAccount)
// Delete specific savings account by id
router.delete('/delete-savings-account/:id', auth.verifyRToken, accountController.removeSavingsAccount)

module.exports = router;
