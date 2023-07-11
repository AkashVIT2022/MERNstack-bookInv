const Stock = require('../admin_inventorys');
const mongoose = require("mongoose")

//get all stocks
const getStocks = async (req,res) => {
    const stocks = await Stock.find({}).sort({"publisher_name":1})
    //modify stocks
    res.status(200).json(stocks)
}

//getting single stock from publisher
const getStock = async (req,res) => {
    const {id}= req.params

    //validating id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Not valid Id/ No such Stock"})
    }

    const stock = await Stock.findById(id)
    if(!stock){
        return res.status(404).json({error: 'No such Stock'})
    }

    res.status(200).json(stock)
}

//getting publishers
const getPublishers = async (req,res) => {
    const stocks = await Stock.distinct("publisher_name")

    res.status(200).json(stocks)
}

module.exports={
    getStocks,
    getStock,
    getPublishers
}