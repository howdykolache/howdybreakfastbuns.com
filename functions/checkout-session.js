const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);
const ADDONS = [
  {
    name: "Chia pudding (Vegan/Gluten Free)",
    priceInCents: 499,
    id: 1,
  },
  {
    name: "Coffee carafe",
    priceInCents: 3499,
    id: 2,
  },
  {
    name: "Tea carafe",
    priceInCents: 3499,
    id: 3,
  },
  {
    name: "Orange juice",
    priceInCents: 399,
    id: 4,
  },
  {
    name: "Topo chico",
    priceInCents: 399,
    id: 5,
  },
];

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 501,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  const data = JSON.parse(event.body);

  const { session, error } = await createSession(data);

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify({ session }),
    };
  }
};

const createSession = async (order) => {
  const BASE_URL = process.env.BASE_URL;

  const { line_items, metadata } = parseOrderData(order);

  // This function's return/output
  const response = {
    session: null,
    error: null
  }

  try {
    response.session = await stripe.checkout.sessions.create({
      success_url: `${BASE_URL}/catering-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/catering-payment-error`,
      line_items,
      metadata,
      mode: "payment",
    });
  } catch (error) {
    console.error(error)
    if (error.type && error.raw.message) {
      // Stripe related error
      response.error = {
        type: error.type,
        message: error.raw.message
      }
    } else {
      // For security reasons, we won’t return the entire error stack to the client.
      // Instead, return a generic error messag but still log the error to the command line.
      response.error = {
        message: 'Internal server error!',
      }
    }
  }

  return response
};

const parseOrderData = (order) => {
  // Convert the addons array into a comma separated addon names
  // Apparently, Stripe’s metadata property doesn’t allow arrays
  let addons = "";
  for (const key in order.addons) {
    const name = order.addons[key].name;
    if (addons.length) {
      addons += "," + name;
    } else {
      addons = name;
    }
  }

  const metadata = {
    ...order,
    addons
  };

  return {
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Howdy Breakfast Buns",
          },
          unit_amount: order.total,
        },
        quantity: 1,
      },
    ],
    metadata,
  };
};
