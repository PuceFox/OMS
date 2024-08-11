const CLIENT_URL = require('../helpers/clientUrl');
const stripe = require('../helpers/stripe');
const { findOrderById } = require('../models/form');


class Controller {
    
    static async checkout(req, res) {
        try {
          const { orderId } = req.params;
          const order = await findOrderById(orderId);
          const session = await stripe.checkout.sessions.create({
            ui_mode: "embedded",
            line_items: [
              {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: order.priceId,
                quantity: 1,
              },
            ],
            mode: "payment",
            return_url: `${CLIENT_URL}/paymentsuccess?session_id={CHECKOUT_SESSION_ID}`,
            automatic_tax: { enabled: true },
          });

          res.status(200).json({
            clientSecret: session.client_secret
          })
        } catch (error) {
          console.log(error);
          throw error;
        }
    }
    
    
}

module.exports = Controller