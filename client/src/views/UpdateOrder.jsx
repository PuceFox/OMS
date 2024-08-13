import { Button } from "@material-tailwind/react";
import logo from "../assets/logo.png";
import { useState } from "react";

export function UpdateOrder() {
  // Dummy data
  const order = {
    fullname: "John Doe",
    offers: [
      { assetName: "Aircraft 1", price: 5000, flightTimeInMinutes: 120 },
      { assetName: "Aircraft 2", price: 6000, flightTimeInMinutes: 150 },
    ],
    origin: "New York",
    destination: "Los Angeles",
  };

  const [offer, setOffer] = useState(0);
  const [manualPrice, setManualPrice] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 p-4">
      <div className="flex justify-center w-full">
        <img src={logo} alt="Logo" className="w-4/12 mb-16 mr-16" />
      </div>
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-purple-800 p-6">
          <h1 className="text-3xl font-bold text-white text-center">
            Update Service Order
          </h1>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Name
              </h2>
              <p className="text-gray-600">{order.fullname}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Aircraft
              </h2>
              <select
                value={offer}
                onChange={(e) => setOffer(Number(e.target.value))}
                className="border-gray-300 rounded-md"
              >
                {order.offers.map((offer, i) => (
                  <option key={i} value={i}>
                    {offer.assetName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Departure
              </h2>
              <p className="text-gray-600">{order.origin}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Arrival
              </h2>
              <p className="text-gray-600">{order.destination}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Price
              </h2>
              <input
                type="number"
                value={manualPrice || order.offers[offer].price}
                onChange={(e) => setManualPrice(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Total Flight Time
              </h2>
              <p className="text-gray-600">
                {order.offers[offer].flightTimeInMinutes} minutes
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 flex justify-between w-full max-w-xs m-auto">
          <Button
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={() => alert("Reject clicked")}
          >
            Reject
          </Button>
          <Button
            className="bg-indigo-700 hover:bg-blue-600 text-white"
            onClick={() => alert("Save clicked")}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
