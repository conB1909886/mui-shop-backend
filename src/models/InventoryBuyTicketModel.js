const mongoose = require('mongoose');

const InventoryBuyTicketSchema = new mongoose.Schema(
  {
    ticketId: { type: String, required: true },
    date: { type: Number, required: true },
    inventory: { type: String, required: true },
    note: { type: String, require: false },
    products: [
      {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const InventoryBuyTicket = mongoose.model('InventoryBuyTicket', InventoryBuyTicketSchema);

module.exports = InventoryBuyTicket;
