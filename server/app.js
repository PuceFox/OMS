if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { mongoConnect } = require("./config/mongoConnection");
const { companyResolvers, companyTypeDefs } = require("./schemas/company");
const { formTypeDefs, formResolvers } = require("./schemas/form");
const { oauth2Client } = require("./utils/oauthClient");

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

  app.get("/oauth2callback", async (req, res) => {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    res.redirect("http://localhost:4000/graphql");
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
})();
