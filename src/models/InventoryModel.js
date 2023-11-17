const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    maxAmount: { type: Number, required: true },
    keeper: { type: String, require: true },
  },
  {
    timestamps: true,
  },
);

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
