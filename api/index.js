const express = require("express");
// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
// const successRoute = require("./routes/success");

dotenv.config();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
// app.use("/api/success", successRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connect successfull"))
  .catch(err => {
    console.log(err);
  });

//this is make endpoint

app.listen(process.env.PORT || 5000, () => {
  console.log("server is running");
});
