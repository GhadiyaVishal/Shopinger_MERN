const mongoose = require("mongoose");
// const { boolean } = require("webidl-conversions");

const CartSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        qnt: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
