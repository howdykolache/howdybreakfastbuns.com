const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);
const nodemailer = require("nodemailer");
const moment = require("moment");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 501,
      body: JSON.stringify({ message: "Method not Implemented" }),
    };
  }

  const sig = event.headers["stripe-signature"];

  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_ENDPOINT_SECRET
    );
  } catch (err) {
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }

  // We only care about the 'succeeded' event
  if (stripeEvent.type != "payment_intent.succeeded") {
    return {
      statusCode: 200,
      body: `acknowledged`,
    };
  }

  const orderData = stripeEvent.data.object.metadata;

  const { subject, body } = buildEmail(orderData);

  // Send notification email to ourselves 
  sendEmailTo(process.env.MAIL_NOTIFICATION, subject, body);

  return {
    statusCode: 200,
    body: "Received!",
  };
};

const buildEmail = (data) => {
  // Date & time
  const formattedDate = moment(data.date, "MM/DD/YYYY").format("MM/DD");
  const dateTime = `${data.deliveryTime} on ${formattedDate}`;
  // Address
  let address = "";
  if (data.orderType.toLowerCase() === "delivery") {
    address = `
    Address:
    ${data.address}
    `;
  }
  // Items
  let lineItems = `${data.dozens}x Howdy Breakfast Buns (dozen): ${data.flavors}`
  data.addons.split(',').forEach(addon => {
    lineItems += `\n    ${addon.trim()}`
  });

  const subject = `Howdy Online Order Confirmation: ${data.name} on ${formattedDate}`;

  const body = `
    Wooohooo! Thank you for ordering Howdy Breakfast Buns, ${data.name}! 

    We are excited to serve you. 🥳

    Your order details are below.

    Date and Time:
    ${dateTime}

    Contact:
    ${data.name}
    ${data.email}
    ${data.phoneNumber}

    Order Type:
    ${data.orderType}
    ${address}
    Order Details:
    ${lineItems}

    Have an amazing day! 😊😊😊
    `;

  return {
    subject,
    body,
  };
};

const sendEmailTo = async (email, subject, body) => {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject,
    text: body,
  });

  console.log("Message sent: %s", info.messageId);
};
