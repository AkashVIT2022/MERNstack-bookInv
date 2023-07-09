const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dealer_InvSchema = new Schema({
    dealer_id: {type: String},
    bookName: {type: String},
    quantity: {type: Number},
    author: {type: String}
},
{
    collection: "dealer_Inv"
});

module.exports = mongoose.model('dealer_Inv',dealer_InvSchema);