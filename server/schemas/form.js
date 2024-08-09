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
} = require("../models/form");
const { createError } = require("../helpers/helpers");

const { sendMail } = require("../helpers/mailer");
const { aircraftCard } = require("../helpers/emailComponents");

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
  }

  type Mutation {
    addOrder(input: CreateOrderInput): Order
    updateStatusOrder(id: ID, status: String): Order
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

    // Function untuk mendapatkan List semua Service
    getService: async () => {
      const services = await findAllService();
      return services;
    },

    getServiceById: async (_parent, args) => {
      const { id } = args;
      const service = await findServiceById(id);
      return service;
    },

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

    getAirportByQuery: async (_parent, args) => {
      const { query } = args;
      const airport = await findAirportByQuery(query);

      return airport;
    },
  },

  Mutation: {
    // Function Add Order
    addOrder: async (_parent, args) => {
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
      </div>`;
      await sendMail(emailContent, email, "Service Offer");
      console.log("email send(?)");

      return orderData;
    },

    // Function Update Status Order
    updateStatusOrder: async (_parent, args) => {
      const { id, status } = args;
      console.log(status, id);

      const orderData = await updateOrder(id, status);

      return orderData;
    },
  },
};

module.exports = {
  formTypeDefs: typeDefs,
  formResolvers: resolvers,
};
