const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let dealer_inventorys = new Schema({
    "id": "String",
    "name": "String",
    "quantity":"Number",
    "dealer_id":"String",
    "dealer_name":"String",
    "author":"String",
    "year":"Number"
  });

module.exports = mongoose.model("dealer_inventorys", dealer_inventorys);