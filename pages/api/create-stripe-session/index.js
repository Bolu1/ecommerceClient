// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// async function CreateStripeSession(req, res) {
//   const { item } = req.body;
// <<<<<<< HEAD
// =======

// >>>>>>> c1f4a9d2e9bf5ae059997813eae6d591883737fa
//   const redirectURL =
//     process.env.NODE_ENV === 'development'
//       ? 'http://localhost:3000'
//       : 'https://stripe-checkout-next-js-demo.vercel.app';

//   const transformedItem = {
//     price_data: {
//       currency: 'usd',
//       product_data: {
//         name: item.name,
//       },
//       unit_amount: item.price * 100,
//     },
//     description: item.description,
//     quantity: item.quantity,
//   };
// // <<<<<<< HEAD
// =======

// // >>>>>>> c1f4a9d2e9bf5ae059997813eae6d591883737fa
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: [transformedItem],
//     mode: 'payment',
//     success_url: redirectURL + '?status=success',
//     cancel_url: redirectURL + '?status=cancel',
//   });

//   res.json({ id: session.id });
// }
