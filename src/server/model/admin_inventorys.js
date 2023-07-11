const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Define the schema for your collection
const admin_inventorys = new Schema({
    "name": "String",
    "quantity": "Number",
    "publisher_id": "String",
    "publisher_name": "String",
    "author": "String",
    "year": "Number",
    "price": "Number"
  })
  
  module.exports = mongoose.model('admin_inventorys',admin_inventorys) 