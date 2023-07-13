const express= require('express')
const {
    getPubs
} = require("../controller/PubController")

const router = express.Router()

//getting all pubs
router.get('/',getPubs)

module.exports = router