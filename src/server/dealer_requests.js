const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let dealer_requests = new Schema({
    "dealer_id": "String",
    "dealer_name": "String",
    "books": [{
      "name": "String",
      "quantity": "Number"
    }],
    "stat":"String"
  });

module.exports = mongoose.model("dealer_requests", dealer_requests);