const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let publisher_shipments = new Schema({
    "pub_id": "String",
    "pub_name": "String",
    "books": [{
      "name": "String",
      "quantity": "Number",
      "price": "Number",
    }],
    "stat":"String"
  });

module.exports = mongoose.model("publisher_shipments", publisher_shipments);