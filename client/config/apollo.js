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
import { setContext } from '@apollo/client/link/context';
import { EXPRESS_API_URL } from "../src/constant/constant";

// Create the HTTP link to your GraphQL server
const httpLink = createHttpLink({
  uri: `${EXPRESS_API_URL}`, // Replace with your GraphQL endpoint
});

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage (or any other secure place)
  const token = localStorage.getItem('token');

  // Return the headers to the context so HTTP link can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    },
  };
});

// Create the Apollo Client instance
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
