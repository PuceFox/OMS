if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { mongoConnect } = require("./config/mongoConnection");
const { companyResolvers, companyTypeDefs } = require("./schemas/company");
const { formTypeDefs, formResolvers } = require("./schemas/form");
const { authentication } = require("./helpers/helpers");
const Controller = require("./controllers/controller");

const server = new ApolloServer({
  typeDefs: [companyTypeDefs, formTypeDefs],
  resolvers: [companyResolvers, formResolvers],
  introspection: true,
  context: async ({ req, res }) => {
    return {
      authentication: async () => {
        return await authentication(req);
      },
    };
  },
});

(async () => {
  await mongoConnect();
  await server.start();
  console.log("Mongo Connected");
  const app = express();
  server.applyMiddleware({ app });

  app.use(cors());
  app.post('/create-checkout-session/:orderId', Controller.checkout)

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
})();
