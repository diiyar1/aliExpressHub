import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const stripe = new Stripe(process.env.STRIPE_SK_KEY, {
    apiVersion: '2022-11-15',
  })

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(body.amount),
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    })

    return { clientSecret: paymentIntent.client_secret }
  } catch (error) {
    console.error('Error creating payment intent:', error)
    throw createError({ statusCode: 500, message: error.message })
  }
})
