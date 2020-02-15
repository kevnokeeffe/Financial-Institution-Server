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
            userId: req.body.userId, //fk
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

  module.exports = router;