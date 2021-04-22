//Problem statement: https://gist.github.com/McLarenCollege/ac4265921f271123e1a33ffa93f85cfd
const stripe = require("stripe")("sk_test_oicXQM9cadHGTiJsQYGexfev");
const readlineSync = require("readline-sync");

const cardNumber = readlineSync.question("Enter your card number: ");
const cardExpiryMonth = readlineSync.question("Enter card expiry month: ");
const cardExpiryYear = readlineSync.question("Enter card expiry year: ");
const cardCVCCode = readlineSync.question("Enter card CVC code: ");

stripe.tokens
  .create({
    card: {
      number: `${cardNumber}`,
      exp_month: `${cardExpiryMonth}`,
      exp_year: `${cardExpiryYear}`,
      cvc: `${cardCVCCode}`,
    },
  })
  .then((token) => {
    console.log("Created card token with id: ", token.id);
    stripe.charges
      .create({
        amount: 360,
        currency: "usd",
        source: `${token.id}`,
        description: "My First Test Charge (created for API docs)",
      })
      .then((resp) => console.log("Created charge with id: ", resp.id))
      .catch((err) => console.log(err.raw.message));
  })
  .catch((err) => console.log(err.raw.message));

// Test Card Details to verify the above api
// number: '4242424242424242',
// exp_month: 4,
// exp_year: 2022,
// cvc: '314',