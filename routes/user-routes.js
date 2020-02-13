var express = require('express');
var router = express.Router();
import register from '../controllers/users/register-controler'
import login from '../controllers/users/auth-controller'

// Hello Bank Test
router.get('/bank', (req, res) => {
  return res.json({ message: 'Hello Bank' })
})

// Register route - for the internal FI system only
router.post('/register', register.registerIndex)

// Login route
router.post('/login', login.index)

module.exports = router;