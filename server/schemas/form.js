const createFlight = require("../helpers/flightCalculation");
const {
  createOrder,
  updateOrder,
  findAllOrder,
  findOrderById,
  findAllService,
  findAllAirports,
  findServiceById,
  findServiceTypeByQuery,
  findAirportByQuery,
  OrderTable,
  findOrderByStatus,
  findPecentage,
  findDataAI,
} = require("../models/form");
const { createError } = require("../helpers/helpers");

const { sendMail } = require("../helpers/mailer");
const { aircraftCard } = require("../helpers/emailComponents");
const { ObjectId } = require("mongodb");
const CLIENT_URL = require("../helpers/clientUrl");
const stripe = require("../helpers/stripe");
const gemini = require("../helpers/geminiai");

const typeDefs = `#graphql
  type Order {
    _id: ID
    fullname: String
    email: String    
    phoneNumber: String
    origin: String
    destination: String
    service: String
    pax: Int
    status: String
    price: Int
    aircraft: String
    createdAt: String
    updatedAt: String
    reason: String
    offers: [Offer]
  }

  type Offer {
    serviceType: String
    assetName: String
    speed: Int
    flightTimeInMinutes: Int
    price: Int
  }

  type DataChart {
    totalReject: Int
    totalAccept: Int
    totalPending: Int
    totalNego: Int
    totalRequest: Int
  }

  type Airport {
    city: String
    airport: String
    iataCode: String
  }

  type Service {
    type: String
    assets: [Asset]
  }

  type Asset {
    name: String
    speed: Int
    pricePerHour: Int
    seatCapacity: Int
  }

  input CreateOrderInput {
    fullname: String!
    email: String!    
    phoneNumber: String!
    origin: String!
    destination: String!
    service: String!
    pax: Int!
  }

  type stripeSession {
    clientSecret: String
  }

  type Query {
    getAirport: [Airport]
    getAirportByQuery(query: String): [Airport]       
    getService: [Service]
    getServiceById(id: ID): Service
    getServiceTypeByQuery(query: String): [Service]
    getOrder: [Order]
    getOrderById(id: ID): Order
    getOrderByStatus(status: String): [Order]
    getOrderChart: DataChart
    getPromptedAI: String
    followUpMail(id: ID): Order
  }

  type Mutation {
    addOrder(input: CreateOrderInput): Order
    updateStatusOrder(id: ID, status: String): Order
    updateOrderData(id: ID, price: Int, aircraft: String, status: String, reason: String) : String
    getClientStripeSession(orderId: ID): stripeSession
    followUpMail(id: ID): Order
  }
`;

const resolvers = {
  Query: {
    // Function untuk mendapatkan List semua Order
    getOrder: async (_parent, _args, contextValue) => {
      const userLogin = await contextValue.authentication();
      const orders = await findAllOrder();
      return orders;
    },

    // Function untuk mendapatkan Order berdasarkan Idnya
    getOrderById: async (_parent, args) => {
      const { id } = args;
      const order = await findOrderById(id);
      return order;
    },

    // Function untuk mendapatkan Order berdasarkan Statusnya
    getOrderByStatus: async (_parent, args) => {
      const { status } = args
      const order = await findOrderByStatus(status)
      return order
    },

    // Function untuk mendapatkan Data Chart dari Status Order
    getOrderChart: async () => {
      const dataChart = await findPecentage()
      return dataChart
    },

    // Function untuk generate hasil analisa AI 
    getPromptedAI: async () => {
      const getDataAI = await findDataAI()
      const resultAI = await gemini(getDataAI)
      return resultAI
    },

    // Function untuk mendapatkan List semua Service
    getService: async () => {
      const services = await findAllService();
      return services;
    },

    // Function untuk mendapatkan Data Service by Id
    getServiceById: async (_parent, args) => {
      const { id } = args;
      const service = await findServiceById(id);
      return service;
    },

    // Function untuk mendapatkan Data Service dari Query
    getServiceTypeByQuery: async (_parent, args) => {
      const { query } = args;
      const service = await findServiceTypeByQuery(query);
      return service;
    },

    // Function untuk mendapatkan List semua Airport
    getAirport: async () => {
      const airports = await findAllAirports();
      return airports;
    },

    // Function untuk mendapatkan Data Service dari Query
    getAirportByQuery: async (_parent, args) => {
      const { query } = args;
      const airport = await findAirportByQuery(query);

      return airport;
    },

    followUpMail: async (_parent, args) => {
      const { id } = args
      const order = await findOrderById(id)
      const { fullname, email, service } = order
      console.log(service);

      return order
    }

  },

  Mutation: {
    getClientStripeSession: async (_parent, args) => {
      try {
        const { orderId } = args;
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

        return {
          clientSecret: session.client_secret
        }
      } catch (error) {
        console.log(error);
        throw error

      }

    },

    // Function Add Order
    addOrder: async (_parent, args) => {
      try {
        const {
          fullname,
          email,
          phoneNumber,
          origin,
          destination,
          service,
          pax,
        } = args.input;

        const offerData = await createFlight(origin, destination, service, pax);
        /*
        if (orderData.length === 0) {
          throw createError("No Aircraft was found", 400);
        }
          */
        console.log(offerData);
        console.log("************************");

        const orderData = await createOrder({
          fullname,
          email,
          phoneNumber,
          origin,
          destination,
          service,
          pax,
          offers: offerData,
          status: "Pending",
          price: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          reason: "",
        });

        let cards = "";

        offerData.forEach((e) => {
          cards += aircraftCard(
            e.serviceType,
            e.assetName,
            e.price,
            e.flightTimeInMinutes,
            orderData._id.toString()
          );
        });

        let emailContent = `
         <p>
          Dear ${fullname}, Thank you for considering Orderly for your private
          jet charter needs. We are thrilled to offer you the luxury, comfort, and
          flexibility that our service is known for. To ensure your experience is
          perfectly tailored to your preferences, we provide a range of charter
          options for ${service} flight. Please review the options below
          and select the one that you find most suitable:
        </p>
        <table style="border-collapse: collapse; width: 100%">
          <tr style="background-color: #f2f2f2">
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px">
              Aircraft
            </th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px">
              Total Flight Time
            </th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px">
              Price
            </th>
          </tr>
          ${cards} 
          
        </table>
          <a href="${CLIENT_URL}/accept/${orderData._id.toString()}">
            <button
              style="
                background-color: #119125;
                color: white;
                border: none;
                border-radius: 5px;
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
                margin-top: 20px;
              "
            >
              Proceed
            </button>
          </a>
          <a href="${CLIENT_URL}/negotiate/${orderData._id.toString()}">
            <button
              style="
                background-color: #F9DD3F;
                color: white;
                border: none;
                border-radius: 5px;
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
                margin-top: 20px;
              "
            >
              Negotiate
            </button>
          </a>
          <a href="${CLIENT_URL}/reject/${orderData._id.toString()}">
            <button
              style="
                background-color: #cf0808;
                color: white;
                border: none;
                border-radius: 5px;
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
                margin-top: 20px;
              "
            >
              Reject
            </button>
          </a>`;
        await sendMail(emailContent, email, "Service Offer");
        console.log("email send(?)");

        return orderData;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    // Function Update Status Order
    updateStatusOrder: async (_parent, args) => {
      const { id, status } = args;
      console.log(status, id);

      const orderData = await updateOrder(id, status);

      return orderData;
    },

    // Function Update Order Data
    updateOrderData: async (_parent, args) => {
      console.log('hit updateorderdata');

      try {
        const { id, price, aircraft, status, reason } = args;

        const order = await findOrderById(id);

        const orders = await OrderTable();
        //make product on stripe
        const product = await stripe.products.create({
          name: `${order.service} - ${aircraft}`,
        });

        const stripePrice = await stripe.prices.create({
          product: product.id,
          unit_amount: Number(price) * 100,
          currency: 'usd'
        })

        await orders.updateOne(
          {
            _id: new ObjectId(id),
          },
          {
            $set: {
              price,
              aircraft,
              status,
              reason,
              priceId: stripePrice.id,
            },
          }
        );

        return "Success update order data";
      } catch (error) {
        console.log(error);
        throw error

      }
    },

    followUpMail: async (_parent, args) => {
      const { id } = args
      try {

        const order = await findOrderById(id)
        const { fullname, email, service } = order

        let emailContent = `
         <p>Dear ${fullname},</p>

         <p>I hope this message finds you well. I wanted to follow up on the proposal we sent regarding your private jet charter needs with Orderly. We understand that making the right choice for your travel is important, and we’re here to assist you in any way we can.</p>

         <p>We would be delighted to discuss any questions you might have or provide additional details about the charter options for your ${service} flight. Your satisfaction and comfort are our top priorities, and we’re eager to ensure that your experience with Orderly is nothing short of exceptional.</p>

         <p>Please let us know if you need more information or if you're ready to proceed with your booking. We look forward to hearing from you soon.</p>

        <p>Best regards,<br>
        <strong>Orderly Private Jet Charter Services</strong></p>
          <a href="${CLIENT_URL}/accept/${id.toString()}">
              <button
                style="
                  background-color: #119125;
                  color: white;
                  border: none;
                  border-radius: 5px;
                  padding: 10px 20px;
                  font-size: 16px;
                  cursor: pointer;
                  margin-top: 20px;
                "
              >
                Proceed
              </button>
          </a>
            <a href="${CLIENT_URL}/reject/${id.toString()}">
              <button
                style="
                  background-color: #cf0808;
                  color: white;
                  border: none;
                  border-radius: 5px;
                  padding: 10px 20px;
                  font-size: 16px;
                  cursor: pointer;
                  margin-top: 20px;
                "
              >
                Reject
              </button>
          </a>
        `
        await sendMail(emailContent, email, "Reminder Offer")
        console.log("reminder email send(?)");

        return order
      } catch (error) {
        console.log(error);
        throw error
      }
    }

  },
};

module.exports = {
  formTypeDefs: typeDefs,
  formResolvers: resolvers,
};
