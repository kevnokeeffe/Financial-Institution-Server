const StringUtil = require('../../utilities/string-util')
const express = require('express')
let router = express.Router()
let User = require ('../../models/users/user-model')

// Register User
router.registerIndex = (req,res) => {
    // Maybe add this to user-control
    const validation = validateIndex(req.body)
    if(!validation.isValid){
        return res.status(400).json({ message: validation.message })
    }
    const user = new User({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password: req.body.password
    })
    user.save(error => {
        if (error) {
            if (error.code === 11000) {
                return res.status(403).json({message: 'Username is already taken'})
            }
            return res.status(500).json()
        }
        return res.status(201).json()
    })
}

function validateIndex(body) {
    let errors = ''
    if (StringUtil.isEmpty(body.fName)) {
        errors += 'First name is required'
    }

    if (StringUtil.isEmpty(body.lName)) {
        errors += 'Last name is required'
    }

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