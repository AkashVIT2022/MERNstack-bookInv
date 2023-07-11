const Stock = require('../dealer_inventorys')
const mongoose = require("mongoose")

//getting single stock from publisher
const getDealer = async (req,res) => {
    const {name}= req.params

    const stock = await Stock.find({dealer_name:name})
    if(!stock){
        return res.status(404).json({error: 'No such Stock'})
    }

    res.status(200).json(stock)
}


module.exports={
    getDealer
}