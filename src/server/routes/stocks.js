const express= require('express')
const {
    getStocks,
    getStock,
    getPublishers
} = require("../controller/stockController");

const router = express.Router()

//getting all stocks
router.get('/',getStocks)

//Get all publishers
router.get('/pub',getPublishers)

//Get one Stock
router.get('/:id',getStock)



module.exports = router