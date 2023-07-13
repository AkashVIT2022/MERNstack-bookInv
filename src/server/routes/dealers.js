const express= require('express')
const {
    getDeals
} = require("../controller/DealController")

const router = express.Router()

//getting all pubs
router.get('/',getDeals)

module.exports = router