const { GraphQLError } = require("graphql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET);
}

module.exports = {
  createError,
  comparePassword,
  hashPassword,
  createToken,
};
