const express = require("express");
const Stripe = require("stripe");
const router = express.Router();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Route to create a PaymentIntent
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency } = req.body;
    
    if (!amount || !currency) {
      return res
        .status(400)
        .json({ error: "Amount and currency are required." });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
