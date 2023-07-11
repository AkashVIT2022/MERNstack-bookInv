const Stock = require('../publisher_inventorys')
const mongoose = require("mongoose")

//getting single stock from publisher
const getPublisher = async (req,res) => {
    const {name}= req.params

    const stock = await Stock.find({publisher_name:name})
    if(!stock){
        return res.status(404).json({error: 'No such Stock'})
    }

    res.status(200).json(stock)
}


module.exports={
    getPublisher
}