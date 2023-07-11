const express= require('express')

const {
    getDealer,
} = require("../controller/dealerController.js")

const router = express.Router()

//Get one Stock
router.get('/:name',getDealer)



module.exports = router