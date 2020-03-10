let express = require('express');
let router = express.Router();
let register = require('../controllers/users/register-controler')
let login = require('../controllers/users/auth-controller')

// Hello Bank Test
router.get('/bank', (req, res) => {
  return res.json({ message: 'Hello Bank' })
})

// Register route - for the internal FI system only
router.post('/register', register.registerIndex)

// Login route
router.post('/login-access', login.accessJWTLogin)

// Login route for refresh JWT
router.post('/login-refresh', login.refreshJWTLogin)

module.exports = router;