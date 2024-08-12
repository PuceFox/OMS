import { gql } from "@apollo/client";

export const MUTATION_LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const GET_SERVICES = gql`
  query GetAirport {
    getService {
      type
    }
  }
`;

export const GET_AIRPORTS = gql`
  query GetAirport {
    getAirport {
      city
      airport
      iataCode
    }
  }
`;

export const MUTATION_ADD_ORDER = gql`
  mutation Mutation($input: CreateOrderInput) {
    addOrder(input: $input) {
      _id
      fullname
      email
      phoneNumber
      origin
      destination
      service
      pax
      status
      createdAt
      updatedAt
    }
  }
`;

export const QUERY_GET_ORDERS = gql`
  query GetAirport {
    getOrder {
      _id
      fullname
      email
      phoneNumber
      origin
      destination
      service
      pax
      status
      price
      aircraft
      createdAt
      updatedAt
    }
  }
`;

export const QUERY_ORDER_BY_ID = gql`
  query GetAirport($getOrderByIdId: ID) {
    getOrderById(id: $getOrderByIdId) {
      _id
      fullname
      email
      phoneNumber
      origin
      destination
      service
      pax
      status
      price
      aircraft
      createdAt
      updatedAt
      offers {
        assetName
        flightTimeInMinutes
        price
        serviceType
        speed
      }
    }
  }
`;


export const UPDATE_ORDER_DATA = gql`
  mutation UpdateOrderData(
    $updateOrderDataId: ID
    $price: Int
    $aircraft: String
    $status: String
    $reason: String
  ) {
    updateOrderData(
      id: $updateOrderDataId
      price: $price
      aircraft: $aircraft
      status: $status
      reason: $reason
    ) 
  }
`;

export const GET_STRIPE_CLIENT = gql`
  mutation GetClientStripeSession($orderId: ID) {
    getClientStripeSession(orderId: $orderId) {
      clientSecret
    }
  }
`;

export const GET_REPORT = gql`
query GetAirport {
  getOrderChart {
    totalReject
    totalAccept
    totalPending
    totalNego
    totalRequest
  }
}`

export const GET_DataAi = gql`
query GetAirport {
  getPromptedAI
}
`