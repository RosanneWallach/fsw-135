const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const inventorySchema = new Schema({

    name: {type: String, required: true},
    type: {type: String, required: true},
    price: Number,
    });

    module.exports = mongoose.model('Inventory', inventorySchema);