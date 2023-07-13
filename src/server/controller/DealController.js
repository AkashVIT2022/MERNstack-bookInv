const Dealer = require('../dealer_requests')

//get all deals
const getDeals = async (req,res) => {
    const deals = await Dealer.find({})
    res.status(200).json(deals)
}

module.exports={
    getDeals
}