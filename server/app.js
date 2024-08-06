if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { mongoConnect } = require("./config/mongoConnection");
const { companyResolvers, companyTypeDefs } = require("./schemas/company");

const server = new ApolloServer({
  typeDefs: [companyTypeDefs],
  resolvers: [companyResolvers],
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

    console.log(code);
    res.redirect("http://localhost:4000/graphql");
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
})();
