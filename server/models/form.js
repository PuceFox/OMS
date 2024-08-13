const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");

// Function untuk Connect ke Table "Order"
async function OrderTable() {
  return getDatabase().collection("Order");
}

// Function untuk Connect ke Table "Service"
async function ServiceTable() {
  return getDatabase().collection("Service");
}

// Function untuk Connect ke Table "Airports"
async function AirportTable() {
  return getDatabase().collection("Airports");
}

// Function untuk Get Semua Data Order
async function findAllOrder(offset, filter) {
  let filterObj = {};
  if (filter) filterObj = filter;
  const orderTable = await OrderTable();
  const cursor = orderTable.find(filterObj);
  const count = await cursor.toArray();
  const totalCount = count.length;
  cursor.rewind();
  const orders = await cursor.skip(offset).limit(10).toArray();

  return { orders, totalCount };
}

async function findOrderCount() {
  const orderTable = await OrderTable();
  return orderTable.countDocuments();
}

// Function untuk Get Data Order by Id
async function findOrderById(id) {
  const order = await (
    await OrderTable()
  ).findOne({
    _id: new ObjectId(id),
  });

  return order;
}

// Function untuk Get Order by Status
async function findOrderByStatus(status) {
  const agg = [
    {
      $match: {
        status,
      },
    },
  ];
  const order = await (await OrderTable()).aggregate(agg).toArray();
  return order;
}

// Function untuk generate data yang akan di prompting ke AI
async function findDataAI() {
  const agg = [
    {
      $project: {
        _id: 0,
        fullname: 0,
        email: 0,
        phoneNumber: 0,
      },
    },
  ];
  const dataAI = await (await OrderTable()).aggregate(agg).toArray();
  // console.log(dataAI);

  return dataAI;
}

// Function untuk Get Data Percentage dari Status
async function findPecentage() {
  const orderReject = await findOrderByStatus("Rejected");
  const orderAccept = await findOrderByStatus("Accepted");
  const orderPending = await findOrderByStatus("Pending");
  const orderNegotiate = await findOrderByStatus("Negotiation");
  const totalOrder =
    orderReject.length +
    orderAccept.length +
    orderPending.length +
    orderNegotiate.length;

  return {
    totalReject: orderReject.length,
    totalAccept: orderAccept.length,
    totalPending: orderPending.length,
    totalNego: orderNegotiate.length,
    totalRequest: totalOrder,
  };
}

// Function untuk Get Semua Data Service
async function findAllService() {
  const services = await (await ServiceTable()).find().toArray();
  return services;
}

// Function untuk Get Data Service by Id
async function findServiceById(id) {
  const service = await (
    await ServiceTable()
  ).findOne({ _id: new ObjectId(id) });
  return service;
}

// Function untuk Get Data Service by Query
async function findServiceTypeByQuery(query) {
  const agg = [
    {
      $match: {
        type: {
          $regex: `(?i)${query}(?-i)`,
        },
      },
    },
  ];

  const service = await (await ServiceTable()).aggregate(agg).toArray();

  return service;
}

// Function untuk Get Semua Data Airports
async function findAllAirports() {
  const agg = [
    {
      $sort: {
        city: 1,
      },
    },
  ];
  const airports = await (await AirportTable()).aggregate(agg).toArray();
  return airports;
}

// Function untuk Get Data Airport by Id
async function findAirportsById(id) {
  const airport = await (
    await AirportTable()
  ).findOne({ _id: new ObjectId(id) });
  return airport;
}

// Function untuk Get Airport by iataCode
async function findAirportByIataCode(iataCode) {
  const airport = await (await AirportTable()).findOne({ iataCode });
  return airport;
}

// Function untuk Get Data Airport by Query
async function findAirportByQuery(query) {
  const agg = [
    {
      $match: {
        $or: [
          {
            city: {
              $regex: `(?i)${query}(?-i)`,
            },
          },
          {
            airport: {
              $regex: `(?i)${query}(?-i)`,
            },
          },
        ],
      },
    },
  ];

  const airport = await (await AirportTable()).aggregate(agg).toArray();
  return airport;
}

// Function untuk Create New Data Order
async function createOrder(data) {
  const newOrder = await (await OrderTable()).insertOne(data);
  const newDataOrder = await (
    await OrderTable()
  ).findOne({
    _id: new ObjectId(newOrder.insertedId),
  });

  return newDataOrder;
}

// Function untuk Update Status Data Order
async function updateOrder(id, status) {
  const updateStatus = await (
    await OrderTable()
  ).updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        status,
        updatedAt: new Date(),
      },
    }
  );

  const updatedOrder = await findOrderById(id);

  return updatedOrder;
}

// Function untuk Update Negotiation Data Order
async function updateNegotiation(id) {
  const updateStatus = await (
    await OrderTable()
  ).updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        status: "Negotiation",
        updatedAt: new Date(),
      },
    }
  );

  const updatedOrder = await findOrderById(id);

  return updatedOrder;
}

module.exports = {
  OrderTable,
  createOrder,
  updateOrder,
  findAllOrder,
  findOrderById,
  findOrderByStatus,
  findDataAI,
  findPecentage,
  findAllService,
  findServiceById,
  findServiceTypeByQuery,
  findAllAirports,
  findAirportsById,
  findAirportByQuery,
  findOrderCount,
  findAirportByIataCode,
};
