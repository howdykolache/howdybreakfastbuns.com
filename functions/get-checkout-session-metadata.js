const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 501,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  const sessionId = event.queryStringParameters.session_id

  if (!sessionId) {
    return {
        statusCode: 422,
        body: 'session_id param is required'
    }
  }

  const metadata = await getOrderDataFromSessionId(sessionId);

  return {
    statusCode: metadata ? 200 : 500,
    body: metadata ? JSON.stringify(metadata) : "",
  };
};

const getOrderDataFromSessionId = async (id) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(id)

        return session.metadata
    } catch (error) {
        console.error(error)
    }
};
