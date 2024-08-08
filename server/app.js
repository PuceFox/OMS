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

  app.get("/googlelogin", async (req, res) => {
    const { code } = req.query;

    console.log(code, "CODE GOOGLE");
    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);
    let oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const { data } = await oauth2.userinfo.get();
    console.log(data);
    console.log("-------------------------------------------------");

    res.status(200).json({
      message: "SUCCESS LOGIN COEG",
      data: data,
    });
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
})();
