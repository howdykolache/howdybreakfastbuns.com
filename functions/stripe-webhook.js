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

  if (Object.keys(orderData).length === 0) {
    return {
      statusCode: 200,
      body: `Unrelated payment`,
    };
  }

  await sendOrderConfimationEmail(orderData);

  return {
    statusCode: 200,
    body: "Received!",
  };
};

const sendOrderConfimationEmail = async (data) => {
  // Date & time
  const formattedDate = moment(data.date, "MM/DD/YYYY").format("MM/DD");
  const dateTime = `${data.deliveryTime} on ${formattedDate}`;
  // Address
  let addressAndNotes = "";
  if (data.orderType.toLowerCase() === "delivery") {
    addressAndNotes = `
    <strong>Address:</strong><br>
    ${data.address}<br><br>
    `;

    if (data.deliveryNotes) {
        addressAndNotes += `
        <strong>Delivery Instructions:</strong><br>
        ${data.deliveryNotes}
        <br><br>
        `
    }
  }
  // Items
  let lineItems = `${data.dozens}x Howdy Breakfast Buns (dozen): ${data.flavors}`
  data.addons.split(',').forEach(addon => {
    lineItems += `<br>${addon.trim()}`
  });
  // Tip
  let tip = ''
  if (data.tipInCents && parseInt(data.tipInCents) > 0) {
    const formattedTip = (parseInt(data.tipInCents) /100).toLocaleString()

     tip = `<br><br>
     <strong>Tip:</strong><br>
     $${formattedTip}
     <br>`
  }

  const subject = `Howdy Online Order Confirmation: ${data.name} on ${formattedDate}`;

  const body = `
    Wooohooo! Thank you for ordering Howdy Breakfast Buns, ${data.name}! 
    <br><br>
    We are excited to serve you. 🥳
    <br><br>
    Your order details are below.
    <br><br>
    <strong>Date and Time:</strong><br>
    ${dateTime}
    <br><br>
    <strong>Contact:</strong><br>
    ${data.name}<br>
    ${data.email}<br>
    ${data.phoneNumber}<br>
    <br>
    <strong>Order Type:</strong><br>
    ${data.orderType}
    <br><br>
    ${addressAndNotes}
    <strong>Order Details:</strong><br>
    ${lineItems}
    ${tip}
    <br><br>
    Have an amazing day! 😊😊😊
    `;

  // Send notification email to ourselves 
  await sendEmailTo(process.env.MAIL_NOTIFICATION, subject, body);
  // To the user
  await sendEmailTo(data.email, subject, body);
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
    html: body,
  });

  console.log("Message sent: %s", info.messageId);
};
