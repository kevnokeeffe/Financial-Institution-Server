let express = require('express')
let router = express.Router()
let moment = require ('moment')
let FImodel = require('../../models/financial-institution/financial-institution')

router.createFi = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    // fi.find({ id: req.body._id })
    //   .exec()
      // .then(fi => {
      //   if (fi.length >= 1) {
      //     return res.status(422).json({ message: 'FI already exists!' })
      //   } else {
          const fi = new FImodel({
            userID: req.body.userID, //fk
            fiName: req.body.fiName,
            fiAddress: req.body.fiAddress,
            fiAddress:[{
            number:req.body.fiNumber,
            ericode:req.body.fiEircode,
            street:req.body.fiStreet,
            city:req.body.fiCity,
            country:req.body.fiCountry,
          }],
            accounts:req.body.accounts,
            fiType:req.body.fiType,
            // uploadDate:req.body.uploadDate
          })
  
          fi
            .save()
            .then(result => {
              res.status(200).send({ auth: true, message: 'Account Created' })
            })
            .catch(err => {
              res
                .status(500)
                .json({ message: 'Error Invalid Inputs', error: err })
            })
        }
      // })
      // .catch(err => {
      //   res.status(500).json({ message: 'Error Invalid Inputs', error: err })
      // })
  //}

// Find all FI - should just be the One
router.indexFI = (req, res) => {
  FImodel.find({}, (error, account) => {
    if (error) {
      return res.status(500).json()
    }
    return res.status(200).json({ account:account})
  }).populate('userID','fiName','fiAddress','accounts','fiType')
}

// Find one single current account by id
router.showFI = (req, res) => {
  FImodel.findOne({userID: req.params.userID}, (error, account) => {
    if(error){
      return res.status(500).json()
    }
    if(!account) {
      return res.status(404).json()
    }
    return res.status(200).json({account: account})
  }) // maybe add a .populate
}

module.exports = router;