const mongoose = require("mongoose");
// const { boolean } = require("webidl-conversions");

const OrderSchema = new mongoose.Schema(
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
    amount: { type: String, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
