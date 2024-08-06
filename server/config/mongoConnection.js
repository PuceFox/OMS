require("dotenv").config()

const { MongoClient } = require("mongodb");

//Connections
const url = process.env.MONGODB_URI
const client = new MongoClient(url)

//Database Name
const dbName = "OMS_Project"

async function mongoConnect() {
    try {
        await client.connect()
        console.log("Success Connect Mongo");

        return "done."
    } catch (error) {
        console.log("Mongo Connection Error", error);
        throw error
    }
}

const getDatabase = () => {
    return client.db(dbName)
}

module.exports = {
    mongoConnect,
    getDatabase
}