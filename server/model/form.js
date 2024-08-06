const { ObjectId } = require("mongodb")
const { getDatabase } = require("../config/mongoConnection")

// Function untuk Connect ke Table "Order"
async function OrderTable() {
    return getDatabase().collection("Order")
}

// Function untuk Connect ke Table "Service"
async function ServiceTable() {
    return getDatabase().collection("Service")
}

// Function untuk Connect ke Table "Airports"
async function AirportTable() {
    return getDatabase().collection("Airports")
}

// Function untuk Get Semua Data Order
async function findAllOrder() {
    const orders = (await OrderTable()).find().toArray()
    return orders
}

// Function untuk Get Data Order by Id
async function findOrderById(id) {
    const order = (await OrderTable()).findOne({
        _id: new ObjectId(id)
    })
    return order
}

// Function untuk Get Semua Data Service
async function findAllService() {
    const services = (await ServiceTable()).find().toArray()
    return services
}

// Function untuk Get Data Service by Id
async function findServiceById(id) {
    const service = (await ServiceTable()).findOne(
        { _id: new ObjectId(id) }
    )
    return service
}

// Function untuk Get Semua Data Airports
async function findAllAirports() {
    const airports = (await AirportTable()).find().toArray()
    return airports
}

// Function untuk Get Data Airport by Id
async function findAirportsById(id) {
    const airport = (await AirportTable()).findOne(
        { _id: new ObjectId(id) }
    )
    return airport
}

// Function untuk Create New Data Order
async function createOrder(data) {
    const newOrder = (await OrderTable()).insertOne(data)
    const newDataOrder = (await OrderTable()).findOne({
        _id: new ObjectId(newOrder.insertedId)
    })

    return newDataOrder
}

// Function untuk Update Status Data Order
async function updateOrder(id, status) {
    const updateStatus = (await OrderTable()).updateOne(
        { _id: new ObjectId(id) },
        {
            status,
            updatedAt: new Date()
        }
    )

    const updatedOrder = await findOrderById(id)

    return updatedOrder
}



module.exports = {
    createOrder,
    updateOrder,
    findAllOrder,
    findOrderById,
    findAllService,
    findServiceById,
    findAllAirports,
    findAirportsById
}