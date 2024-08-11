const stripe = require("stripe")(process.env.STRIPE_API_SECRET);

module.exports = stripe