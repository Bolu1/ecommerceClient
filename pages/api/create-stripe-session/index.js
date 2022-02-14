const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {
  const { item } = req.body;

  const redirectURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://stripe-checkout-next-js-demo.vercel.app";

  // const transformedItem = {
  //   price_data: {
  //     currency: 'usd',
  //     product_data: {
  //       name: item.name,
  //     },
  //     unit_amount: item.price * 100,
  //   },
  //   description: item.description,
  //   quantity: item.quantity,
  // };
  const amount = item.price * 100;
  const CURRENCY = 'usd'
  console.log(amount);
  const session = await stripe.checkout.sessions.create({
    submit_type: "donate",
    payment_method_types: ["card"],
    line_items: [
      {
        name: "Pay",
        amount: 40,
        currency: CURRENCY,
        quantity: 1,
      },
    ],
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000/cancel`,
  });
  console.log("hehh");
  console.log(amount);
  res.json({ id: session.id });
}

export default CreateStripeSession;
