const Pub = require('../publisher_shipments')

//get all pubs
const getPubs = async (req,res) => {
    const pubs = await Pub.find({})
    res.status(200).json(pubs)
}


module.exports={
    getPubs
}