var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Hello Bank Test
router.get('/bank', (req, res) => {
  return res.json({ message: 'Hello Bank' })
})

module.exports = router;
