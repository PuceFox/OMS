const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.SECRET_KEY;
const bcrypt = require("bcryptjs");

//Create Error
function createError(message, code) {
  let httpMsg = "INTERNAL SERVER ERROR";
  if (code === 400) httpMsg = "BAD REQUEST";
  return new GraphQLError(message, {
    extensions: {
      code: httpMsg,
      http: { status: code },
    },
  });
}

//Hash Password
const hashPassword = (pass) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(pass, salt);
};

const comparePassword = (pass, hashedPassword) => {
  return bcrypt.compareSync(pass, hashedPassword);
};

//Set and Verify Token
const setToken = (payload) => {
  return jwt.sign(payload, jwtSecret);
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

//Set Authentication
const authentication = async (req) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw createError("Invalid Token", 401);
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    throw new createError("Invalid Token", 401);
  }

  const decodeToken = verifyToken(token);
  const user = await findUserById(decodeToken.id);

  if (!user) {
    throw createError("Invalid User", 401);
  }

  return {
    userId: user.id,
    email: user.email,
  };
};

module.exports = {
  createError,
  authentication,
  setToken,
  verifyToken,
  hashPassword,
  comparePassword,
};
