if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { mongoConnect } = require("./config/mongoConnection");
const { companyResolvers, companyTypeDefs } = require("./schemas/company");
const { formTypeDefs, formResolvers } = require("./schemas/form");
const { oauth2Client } = require("./utils/oauthClient");
const { google } = require("googleapis");

const server = new ApolloServer({
  typeDefs: [companyTypeDefs, formTypeDefs],
  resolvers: [companyResolvers, formResolvers],
  introspection: true,
});

(async () => {
  await mongoConnect();
  await server.start();
  console.log("Mongo Connected");
  const app = express();
  server.applyMiddleware({ app });

  app.use(cors());

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
})();
