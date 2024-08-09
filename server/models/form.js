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
    const orders = await (await OrderTable()).find().toArray()
    return orders
}

// Function untuk Get Data Order by Id
async function findOrderById(id) {
    const order = await (await OrderTable()).findOne({
        _id: new ObjectId(id)
    })

    return order
}

// Function untuk Get Semua Data Service
async function findAllService() {
    const services = await (await ServiceTable()).find().toArray()
    return services
}

// Function untuk Get Data Service by Id
async function findServiceById(id) {
    const service = await (await ServiceTable()).findOne(
        { _id: new ObjectId(id) }
    )
    return service
}
async function findServiceTypeByQuery(query) {
    const agg = [
        {
            '$match': {
                'type': {
                    '$regex': `(?i)${query}(?-i)`
                }

            }
        }];

    const service = await (await ServiceTable()).aggregate(agg).toArray()

    return service
}

// Function untuk Get Semua Data Airports
async function findAllAirports() {
    const agg = [
        {
            '$sort': {
                'city': 1
            }
        }
    ];
    const airports = await (await AirportTable()).aggregate(agg).toArray()
    return airports
}

// Function untuk Get Data Airport by Id
async function findAirportsById(id) {
    const airport = await (await AirportTable()).findOne(
        { _id: new ObjectId(id) }
    )
    return airport
}

async function findAirportByQuery(query) {
    const agg = [
        {
            '$match': {
                '$or': [
                    {
                        'city': {
                            '$regex': `(?i)${query}(?-i)`
                        }
                    }, {
                        'airport': {
                            '$regex': `(?i)${query}(?-i)`
                        }
                    }
                ]
            }
        }];

    const airport = await (await AirportTable()).aggregate(agg).toArray()
    return airport
}

// Function untuk Create New Data Order
async function createOrder(data) {
    const newOrder = await (await OrderTable()).insertOne(data)
    const newDataOrder = await (await OrderTable()).findOne({
        _id: new ObjectId(newOrder.insertedId)
    })

    return newDataOrder
}

// Function untuk Update Status Data Order
async function updateOrder(id, status) {
    const updateStatus = await (await OrderTable()).updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {

                status,
                updatedAt: new Date()
            }
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
    findServiceTypeByQuery,
    findAllAirports,
    findAirportsById,
    findAirportByQuery
}