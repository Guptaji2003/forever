const initiatePhonePePayment = async (checkoutId, amount, userId) => {
  // Construct redirect URL to PhonePe sandbox/gateway
  const redirectUrl = `https://www.phonepe.com/payment-gateway?amount=${amount}&refId=${checkoutId}`;
  return redirectUrl;
};

module.exports = { initiatePhonePePayment };
