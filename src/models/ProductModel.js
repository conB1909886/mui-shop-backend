const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    costPrice: { type: Number, required: false, default: 120000 },
    countInStock: { type: Number, required: true },
    rating: { type: Number },
    description: { type: String },
    discount: { type: Number },
    selled: { type: Number },
    inventory: { type: String },
  },
  {
    timestamps: true,
  },
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
