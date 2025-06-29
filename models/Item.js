const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    description: { type: String },
    locationFound: { type: String, required: true },
    dateFound: { type: Date, required: true },
    claimed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);
