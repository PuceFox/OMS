// import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";

// // Create the HTTP link to your GraphQL server
// const httpLink = createHttpLink({
//   uri: "https://localhost:4000", // Replace with your GraphQL endpoint
// });

// // Define the auth link to include the token in headers
// const authLink = setContext((_, { headers }) => {
//   // Get the authentication token from localStorage if it exists
//   const token = localStorage.getItem("token");
//   // Return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// // Create the Apollo Client instance
// export const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

// Create the HTTP link to your GraphQL server
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql", // Replace with your GraphQL endpoint
});

// Create the Apollo Client instance
export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
