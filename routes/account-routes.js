let express = require('express')
let router = express.Router();
const accountControler = require('../controllers/accounts/account-controllers')

// Create account
 router.post('/create', accountControler.createCurrentAccount);
// router.get()
// router.get()
// router.put()
// router.delete()

module.exports = router;
