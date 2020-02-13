import express from 'express'
const router = express.Router()

router.post()
router.get()
router.get()
router.put()
router.delete()
let express = require('express')
let router = express.Router()
const accountController = require('../controllers/accounts/account-controllers')

// Create a current account
router.post('/create-current', accountController.createCurrentAccount)
// Create a savings account
router.post('/create-savings', accountController.createSavingsAccount)
// Read all current accounts
router.get('/find-current-all', accountController.indexCurrentAccount)
// Read all savings accounts
router.get('/find-savings-all', accountController.indexSavingsAccount)
// Read one individual current account by id
router.get('find-current-individual/:id', accountControler.showIndividualCurrentAccount)
// Read one individual savings account by id
router.get('find-current-individual/:id', accountControler.showIndividualSavingsAccount)
// Update a spacific current account by id
router.put('/update-current-account/:id', accountController.updateCurrentAccount)
// Update a specific savings account by id
router.put('/update-savings-account/:id', accountController.updateSavingsAccount)
// Delete specific current account by id
router.delete('/delete-current-account/:id', accountController.removeCurrentAccount)
// Delete specific savings account by id
router.delete('/delete-current-account/:id', accountController.removeSavingsAccount)

module.exports = router