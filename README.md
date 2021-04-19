About Solution.
This solution works using Payment Intent API instead of Charges because according to Stripe documentation this is a newer version of payment processing API and going forward all new features will be added to Payment Intent API only. Also it supports in-store payments via terminal and cards that require 3DS, iDEAL, SEPA while Charge API doesn’t support that. In addition to that Payment Intent API is SCA ready.
Source: https://stripe.com/docs/payments/payment-intents/migration/charges
Also since I have used Payment Intent API when order is placed the ID begins with “pi_” and not “ch_” since it’s not a Charge API. 

Build
To build solution I have used Stripe documentation on a Payment Intent API and “Custom payment flow” which can be found here: https://stripe.com/docs/payments/integration-builder 
There was also a way to use a “Prebuilt Checkout page” but I have opted out since we needed to have control over our form and styles. 

Challenges
The main challenge was to get card-element form displayed as for some reason it didn’t work right out of the box as I was following the documentation. I had to enable express.json() on the server side which is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser. And then it started to work but still was sensitive to changes that I was making to JavaScript code and keep dis-appearing.  

Future improvement
The first thing I would do is to store amount and title in the database. I might choose Firebase for simplicity if it’s a small project or other NoSQL db. That way we don’t need to hardcode those parameters in the code. Other improvements could be: 


•	Basic Authentication screen (can be done via Firebase)
•	Ordering multiple items
•	Order lookup by order id. 
•	Email confirmation after order is placed

To get started, clone the repository and run `npm install` to install dependencies:

```
git clone https://github.com/rustamaliyev/stripe-hw.git && cd stripe-hw
npm install
```

Then run the application locally:

```
npm start
```

Navigate to [http://localhost:3000](http://localhost:3000) to view the index page.
