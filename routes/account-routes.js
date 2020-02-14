let express = require('express');
let router = express.Router()
let accountController = require('../controllers/accounts/account-controllers')

// Create a current account
router.post('/createcurrent', accountController.createCurrentAccount)
// Create a savings account
router.post('/createsavings', accountController.createSavingsAccount)
// Read all current accounts
router.get('/findcurrentall', accountController.indexCurrentAccount)
// Read all savings accounts
router.get('/findsavingsall', accountController.indexSavingsAccount)
// Read one individual current account by id
router.get('findcurrentindividual/:id', accountController.showIndividualCurrentAccount)
// Read one individual savings account by id
router.get('findcurrentindividual/:id', accountController.showIndividualSavingsAccount)
// Update a spacific current account by id
router.put('/updatecurrentaccount/:id', accountController.updateCurrentAccount)
// Update a specific savings account by id
router.put('/updatesavingsaccount/:id', accountController.updateSavingsAccount)
// Delete specific current account by id
router.delete('/deletecurrentaccount/:id', accountController.removeCurrentAccount)
// Delete specific savings account by id
router.delete('/deletecurrentaccount/:id', accountController.removeSavingsAccount)

module.exports = router;