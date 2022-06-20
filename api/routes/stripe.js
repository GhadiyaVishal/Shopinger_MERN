const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);

router.get("/payment", (req, res) => {
  console.log(req, "require");
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "inr",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        console.log("stripe if askc");
        return res.status(500).json(stripeErr);
      } else {
        console.log("stripe response");
        return res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
