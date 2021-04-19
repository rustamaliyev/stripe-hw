const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const { nextTick } = require('process');
const stripe = require('stripe')('sk_test_T2x0op92qlyAqMafDqaK63GV00SmtfAp6n');

var app = express();
app.use(express.json());
// view engine setup (Handlebars)

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));


app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

var hbs = exphbs.create({});
hbs.handlebars.registerHelper('piid', function() {
  //return document.location.search.split('?')[1].split('=')[1];
});

/**
 * Home route
 */
app.get('/', function(req, res) {
  res.render('index');
});

/**
 * Checkout route
 */
 app.get('/checkout', function(req, res) {
  // Just hardcoding amounts here to avoid using a database
  const item = req.query.item;
  let title, amount, error;

  switch (item) {
    case '1':
      title = "The Art of Doing Science and Engineering"
      amount = 2300      
      break;
    case '2':
      title = "The Making of Prince of Persia: Journals 1985-1993"
      amount = 2500
      break;     
    case '3':
      title = "Working in Public: The Making and Maintenance of Open Source"
      amount = 2800  
      break;     
    default:
      // Included in layout view, feel free to assign error
      error = "No item selected"      
      break;
  }

  res.render('checkout', {
    title: title,
    amount: amount,
    error: error
  });
});

/**
 * Stipe payment intent route
 */


app.post("/create-payment-intent", async (req, res) => {
 
  const { items } = req.body;
  const amount = req.body.item.amount;
  //const piID = JSON.stringify(req.body.item.item);
  const title = req.body.item.title;
  // Create a PaymentIntent with the order amount and currency
  
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    description: title,
  });

 
  res.send({
    clientSecret: paymentIntent.client_secret
  });

});



/**
 * Success route
 */
 app.get('/success', function(req, res) {
  res.render('success');
});






/**
 * Start server
 */
app.listen(3000, () => {
  console.log('Getting served on port 3000');
});
