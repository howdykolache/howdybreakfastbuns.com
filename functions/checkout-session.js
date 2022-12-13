const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 501,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  const session = await createSession(1, {});

  return {
    statusCode: session ? 200 : 500,
    body: session ? JSON.stringify(session) : '',
  };
};

const createSession = async (quantity, metadata) => {
  const BASE_URL = process.env.BASE_URL;
  const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID;

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `${BASE_URL}/catering-success`,
      cancel_url: `${BASE_URL}/catering-payment-error`,
      line_items: [{ price: STRIPE_PRICE_ID, quantity }],
      metadata,
      mode: "payment",
    });

    return session;
  } catch (error) {
    console.error(error);
  }
};
