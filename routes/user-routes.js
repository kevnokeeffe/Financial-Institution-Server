var express = require('express');
var router = express.Router();

// Hello Bank Test
router.get('/bank', (req, res) => {
  return res.json({ message: 'Hello Bank' })
})

module.exports = router;