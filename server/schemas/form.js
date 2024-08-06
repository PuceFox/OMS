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
    createdAt: String
    updatedAt: String
  }

  type Airport {
    iataCode: String
    city: String
  }

  type Service {
    name: String
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

  # Query ini digunakan untuk MEMBACA DATA
  type Query {
    getAirport: [Airport]       # endpoint "posts" mereturn array of Post
    getService: [Service]
  }

  # Mutation ini digunakan untuk MENGUBAH / MEMANIPULASI DATA
  type Mutation {
    addOrder(input: CreateOrderInput): Order
  }
`;