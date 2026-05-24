const AfricasTalking = require('africastalking');

const sendSMS = async (phone, message) => {
  try {
    const AT = AfricasTalking({
      apiKey: process.env.AT_API_KEY,
      username: process.env.AT_USERNAME
    });

    const sms = AT.SMS;
    await sms.send({
      to: [phone],
      message,
      from: 'SIMSWAP'
    });

    console.log('SMS sent to', phone);
    return true;
  } catch (err) {
    console.error('SMS error:', err.message);
    return false;
  }
};

module.exports = sendSMS;