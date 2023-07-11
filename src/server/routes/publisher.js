const express= require('express')

const {
    getPublisher,
} = require("../controller/publisherController")

const router = express.Router()

//Get one Stock
router.get('/:name',getPublisher)



module.exports = router