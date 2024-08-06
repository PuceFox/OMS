const { createOrder, updateOrder, updateOrder, findAllOrder, findOrderById, findAllService, findAllAirports, findServiceById } = require("../model/form");

const typeDefs = `#graphql
  type Order {
    _id: ID
    fullname: String
    email: String    
    phoneNumber: String
    origin: String
    destination: String
    service: String
    pax: Number
    status: String
    createdAt: String
    updatedAt: String
  }

  type Airport {
    iataCode: String
    city: String
  }

  type Service {
    type: String
    assets: [Asset]
  }

  type Asset {
    name: String
    speed: Number
    price: Number
    seatCapacity: Number 
  }

  input CreateOrderInput {
    fullname: String
    email: String    
    phoneNumber: String
    origin: String
    destination: String
    service: String
    pax: Number
  }

  type Query {
    getAirport: [Airport]       
    getService: [Service]
    getServiceById(id: ID): Service
    getOrder: [Order]
    getOrderById(id: ID): Order
  }

  type Mutation {
    addOrder(input: CreateOrderInput): Order
    updateStatusOrder({id: ID, status: String}): Order
  }
`;

const resolvers = {
  Query: {
    // Function untuk mendapatkan List semua Order
    getOrder: async () => {
      const orders = await findAllOrder()
      return orders
    },

    // Function untuk mendapatkan Order berdasarkan Idnya
    getOrderById: async (_parent, args) => {
      const { id } = args
      const order = await findOrderById(id)
      return order
    },

    // Function untuk mendapatkan List semua Service
    getService: async () => {
      const services = await findAllService()
      return services
    },

    getServiceById: async (_parent, args) => {
      const { id } = args
      const service = await findServiceById(id)
      return service
    },
    // Function untuk mendapatkan List semua Airport
    getAirport: async () => {
      const airports = await findAllAirports()
      return airports
    }
  },

  Mutation: {
    // Function Add Order
    addOrder: async (_parent, args) => {
      const { fullname, email, phoneNumber, origin, destination, service, pax } = args.input

      const orderData = await createOrder({
        fullname,
        email,
        phoneNumber,
        origin,
        destination,
        service,
        pax,
        status: "Pending",
        createdAt: new Date(),
        updatedAt: new Date()
      })

      return orderData
    },
    
    // Function Update Status Order
    updateStatusOrder: async (_parent, args) => {
      const { id, status } = args
      const orderData = await updateOrder(id, status)

      return orderData
    }
  }
}