const stripe = require('../helpers/stripe')


class Controller {
    static async checkout(req, res) {
        const session = await stripe.checkout.session.create({
            ui_mode: "embedded" 
        })

        res.status(200).json({
            message: "Session created",
            clientSecret: session.client_secret
        })
    }
    
    
}

module.exports = Controller