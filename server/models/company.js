const { getDatabase } = require("../config/mongoConnection");

const collection = getDatabase().collection("Company");

//find company by email

async function findCompanyByEmail(email) {
  const company = await collection.findOne({ email });
  return company;
}

module.exports = {
  findCompanyByEmail,
};
