const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {
  const { item } = req.body;

  const redirectURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://stripe-checkout-next-js-demo.vercel.app';

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
  const amount =  item.price * 100

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        name: 'Custom amount donation',
        amount: amount,
        currency: 'usd',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: redirectURL + '?status=success',
    cancel_url: redirectURL + '?status=cancel',
  });

  res.json({ id: session.id });
}

export default CreateStripeSession;