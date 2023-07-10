const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let admin_inventorys = new Schema({
    "id": "String",
    "name": "String",
    "quantity":"Number",
    "publisher_id":"String",
    "author":"String",
    "year":"Number"
  });

module.exports = mongoose.model("admin_inventorys", admin_inventorys);