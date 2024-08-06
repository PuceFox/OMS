const typeDefs = `#graphql

    type Company {
        email: String,
        password: String,
    }

    type LoginResponse {
        token: String,
        oauthUrl: string
    }

    type Mutation {
        login(email: String, password: String) : LoginResponse
    }

`;

module.exports = {
  companyTypeDefs: typeDefs,
};
