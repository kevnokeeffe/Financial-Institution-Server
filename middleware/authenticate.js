const jwt = require('jsonwebtoken')
const User = require('../models/users/user-model')
let express = require('express')
let router = express.Router()

router.validateAccess = (req, res, next) => {
  let token = req.header('Authorization')
  try {
    let payload = jwt.verify(token, process.env.SECRET_KEY_ACCESS)
    User.findById(payload._id)
      .then(user => {
        if (!user) {
          return res.status(401).send()
        }
        req._id = payload._id
        next()
      })
      .catch(err => {
        if (err) {
          return res.status(401).send(err)
        }
        return res.status(401).send(err)
      })
  } catch (err) {
    return res.status(401).send(err)
  }
}

router.validateRefresh = (req, res, next) => {
  let token = req.header('Authorization')
  try {
    let payload = jwt.verify(token, process.env.SECRET_KEY_REFRESH)
    User.findById(payload._id)
      .then(user => {
        if (!user) {
          return res.status(401).send()
        }
        req._id = payload._id
        next()
      })
      .catch(err => {
        if (err) {
          return res.status(402).send(err)
        }
        return res.status(403).send(err)
      })
  } catch (err) {
    return res.status(404).send(err)
  }
}

//Token verification
router.verifyRToken = ((req, res, next) => {
	const token = req.headers.authorization || req.headers['Authorization'];
	if (!token)
		return res.status(403).send({ auth: false, message: 'No token provided.' });
	jwt.verify(token, process.env.SECRET_KEY_REFRESH, function(err, decoded) {
		if (err)
			return res.status(501).send({ auth: false, message: 'Failed to authenticate token.' });
		// if everything good, save to request for use in other routes
		req.userId = decoded.id;
		next();
	});
});

router.verifyAToken = ((req, res, next) => {
	const token = req.headers.authenticate || req.headers['authenticate'];
	if (!token)
		return res.status(403).send({ auth: false, message: 'No token provided.' });

	jwt.verify(token, process.env.SECRET_KEY_ACCESS, function(err, decoded) {
		if (err)
			return res.status(501).send({ auth: false, message: 'Failed to authenticate token.' });

		// if everything good, save to request for use in other routes
		req.userId = decoded.id;
		next();
	});
});


module.exports = router;