const express = require('express')
const router = express.Router()

router.isEmpty = (value) =>{
    return !value || !value.trim()
}

router.capitalize = (word) => {
    return word.charAt(0).toUpperCase()
}

module.exports = router
