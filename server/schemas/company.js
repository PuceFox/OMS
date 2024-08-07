const {
  createError,
  setToken,
  comparePassword,
} = require("../helpers/helpers");
const { findCompanyByEmail } = require("../models/company");
const { authUrl } = require("../utils/oauthClient");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "79f807001@smtp-brevo.com",
    pass: "PrdL4COMcgszbZRY",
  },
});

const typeDefs = `#graphql

    type Company {
        email: String,
        password: String,
    }

    type LoginResponse {
        token: String,
        oauthUrl: String
    }

    type Mutation {
        login(email: String, password: String) : LoginResponse
    }

    type Query {
        getCompany(email: String) : Company
    }

`;

const resolvers = {
  Mutation: {
    login: async function login(_parent, args) {
      const { email, password } = args;

      const company = await findCompanyByEmail(email);
      if (!company) throw createError("Invalid Credential", 401);

      //compare password
      if (!comparePassword(password, company.password))
        throw createError("Invalid Credential", 401);
      try {
        const info = await transporter.sendMail({
          from: "<zakyabdurrahman10@gmail.com>",
          to: "yoel.kristiadi.20@gmail.com",
          subject: "Business Dealing",
          text: "HAHA MAMPUS",
          html: "<b>Hello world?</b>",
        });
      } catch (error) {
        console.log(error);
      }

      const payload = {
        companyId: company._id,
        companyEmail: company.email,
      };

      const token = setToken(payload);

      return {
        token: token,
        oauthUrl: authUrl,
      };
    },
  },
  Query: {
    getCompany: async (_parent, args) => {
      const { email } = args;
      const company = await findCompanyByEmail(email);

      return company;
    },
  },
};

module.exports = {
  companyTypeDefs: typeDefs,
  companyResolvers: resolvers,
};
