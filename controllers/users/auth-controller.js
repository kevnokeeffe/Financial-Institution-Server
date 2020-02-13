import { StringUtil } from '../../utilities/string-util'
import User from '../models/user-model'
import { generateJWT } from '../../services/auth-service'
let express = require('express')
let router = express.Router()

// Login User
router.index = (req, res) => {
    const validation = validateIndex(req.body)
    if(!validation.isValid){
        return res.status(400).json({ message: validation.message })
    }

    User.findOne({ email: req.body.email },(error, user) => {
        if (error) {
            return res.status(500).json({ message: 'tis fucked'})
        }

        if (!user) {
            return res.status(401).json()
        }
        const passwordMatch = User.passwordMatches(req.body.password, user.password)
        if (!passwordMatch){
            return res.status(401).json()
        }
        const token = generateJWT(user)
        return res.status(200).json({ token: token })
    }).catch(err => {
        if (err) {
            return res.status(401).send(err)
        }
        return res.status(401).send(err)
    })
}

function validateIndex(body) {
    let errors = ''

    if (StringUtil.isEmpty(body.email)) {
        errors += 'E-mail is required'
    }

    if (StringUtil.isEmpty(body.password)) {
        errors += 'Password is required'
    }

    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}

module.exports = router