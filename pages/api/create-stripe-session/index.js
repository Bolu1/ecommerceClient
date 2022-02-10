const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {
  const { item } = req.body;

  const sredirectURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/success'
      : 'https://ecommercestuff.vercel.app/success';

  
  const credirectURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/cancel'
    : 'https://ecommercestuff.vercel.app/cancel';

  const transformedItem = {
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    description: item.description,
    quantity: item.quantity,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [transformedItem],
    mode: 'payment',
    success_url: sredirectURL ,
    cancel_url: credirectURL ,
  });

  res.json({ id: session.id });
}

export default CreateStripeSession;