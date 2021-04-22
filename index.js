const stripe = require('stripe')('sk_test_oicXQM9cadHGTiJsQYGexfev');
let readlineSync = require('readline-sync');

let cardNumber = readlineSync.question('Enter your card number: ');
let cardExpiryMonth = readlineSync.question('Enter card expiry month: ');
let cardExpiryYear = readlineSync.question('Enter card expiry year: ');
let cardCVCCode = readlineSync.question('Enter card CVC code: ');

stripe.tokens.create({
    card: {
        number: `${cardNumber}`,
        exp_month: `${cardExpiryMonth}`,
        exp_year: `${cardExpiryYear}`,
        cvc: `${cardCVCCode}`,
    },
}).then((token) => {
    console.log('Created card token with id: ',token.id);
    stripe.charges.create({
        amount: 360,
        currency: 'usd',
        source: `${token.id}`,
        description: 'My First Test Charge (created for API docs)',
    })
}).catch((err) => console.log(err.raw.message));

// Test Card Details to verify the above api
// number: '4242424242424242',
// exp_month: 4,
// exp_year: 2022,
// cvc: '314',