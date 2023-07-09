const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const publisherSchema = new Schema({

    "pub_id":"String",
    "books":[{
        "bookName":"String",
        "quantity":"Number",
        "price":"Number",
    }],
    "ETD":"String",
    "address":"String",
    "stat":"String"
},
    {
        collection: "publisher_shipments"
    });
/*
Schema({obj},{collection})
*/
module.exports = mongoose.model('publisher_shipments', publisherSchema);