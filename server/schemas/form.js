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
} = require("../models/form");
const { createError } = require("../helpers/helpers");

const { sendMail } = require("../helpers/mailer");
const { aircraftCard } = require("../helpers/emailComponents");
const { ObjectId } = require("mongodb");
const CLIENT_URL = require("../helpers/clientUrl");

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

  }

  type Mutation {
    addOrder(input: CreateOrderInput): Order
    updateStatusOrder(id: ID, status: String): Order
    updateOrderData(id: ID, price: Int, aircraft: String, status: String, reason: String) : Order
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
  },

  Mutation: {
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

        let emailContent = `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; display: flex; flex-direction: column; width: 100vw justify-content: center; align-items: center; height: 100vh; margin: 0;">
          ${cards} 
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
          </a>
        </div>`;
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
      const { id, price, aircraft, status, reason } = args;
  
        const orders = await OrderTable();
        await orders.updateOne(
          {
            _id: new ObjectId(id),
          },
          {
            $set: {
              price,
              aircraft,
              status,
              reason
            },
          }
        );

        return "Success update order data";
      }

  },
};

module.exports = {
  formTypeDefs: typeDefs,
  formResolvers: resolvers,
};
