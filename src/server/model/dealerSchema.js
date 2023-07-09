const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dealerSchema = new Schema({

    "deal_id": "String",
    "books": [{
        "bookName": "String",
        "quantity": "Number",
        "author": "String",
    }],
    "ETA": "String",
    "address": "String",
    "stat": "String"
},
    {
        collection: "dealer_requests"
    });
/*
Schema({obj},{collection})
*/
module.exports = mongoose.model('dealer_requests', dealerSchema);