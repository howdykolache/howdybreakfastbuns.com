export default async function (subject, body) {
  try {
    const reqConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        body
      }),
    };

    await fetch("/.netlify/functions/send-email", reqConfig);
  } catch (error) {
    console.error(error);
  }
}
