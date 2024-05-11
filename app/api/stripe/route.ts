// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         try {
//             // Create a new subscription
//             const subscription = await stripe.subscriptions.create({
//                 customer: req.body.customerId,
//                 items: [{ plan: req.body.planId }],
//                 expand: ['latest_invoice.payment_intent'],
//             });
//             res.status(200).json(subscription);
//         } catch (error) {
//             res.status(400).json({ error: { message: error.message } });
//         }
//     } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }