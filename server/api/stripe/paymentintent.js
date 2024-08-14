import { loadStripe } from "@stripe/stripe-js";

export default defineEventHandler(async (event) => {
const body = await readBody(event);
const stripe = await loadStripe(process.env.STRIPE_SK_KEY);
const elements = stripe.value.elements();
return await stripe.value.paymentIntents.create({
amount: Number(body.amount),
currency: "usd",
automatic_payment_methods: { enabled: true },
});
});