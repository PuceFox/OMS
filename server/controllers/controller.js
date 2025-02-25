const CLIENT_URL = require("../helpers/clientUrl");
const stripe = require("../helpers/stripe");
const { findOrderById } = require("../models/form");

class Controller {
  static async status(req, res) {
    try {
      const session = await stripe.checkout.sessions.retrieve(
        req.query.session_id
      );

      res.status(200).json({
        status: session.status,
        customer_email: session.customer_details.email,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

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
        return_url: `${CLIENT_URL}/paymentstatus/${order._id}?session_id={CHECKOUT_SESSION_ID}`,
        automatic_tax: { enabled: true },
      });

      res.status(200).json({
        clientSecret: session.client_secret,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = Controller;
