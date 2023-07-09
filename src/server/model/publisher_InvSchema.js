const mongoose = require("mongoose");
const Schema = mongoose.Schema;

publisher_InvSchema = new Schema({
    publisher_id: {type: String},
    bookName: {type: String},
    quantity: {type: Number},
    author: {type: String}
},
{
    collection: "publisher_Inv"
});

module.exports = mongoose.model('publisher_Inv',publisher_InvSchema);