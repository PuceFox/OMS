import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import Toastify from "toastify-js";
import logo from "../assets/logo.png";
import {
  MUTATION_NEGOTIATION_ORDER,
  QUERY_ORDER_BY_ID,
  QUERY_GET_ORDERS,
  MUTATION_REJECT_ORDER,
} from "../queries";
import formatPrice from "../utils/formatDollar";
import { formatTime } from "../utils/formatTime";
import Loading from "../components/Loading";

const toastStyles = {
  error: {
    background: "linear-gradient(to right, #FF5F6D, #FFC371)",
  },
};

const showToast = (type, message) => {
  Toastify({
    text: message,
    backgroundColor: toastStyles[type].background,
    className: type === "success" ? "toastify-success" : "toastify-error",
    duration: 3000,
  }).showToast();
};

const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-4">{message}</h2>
        <Button
          className="bg-purple-500 hover:bg-blue-600 text-white"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export function UpdateOrder() {
  const { orderId } = useParams();
  const { loading, error, data } = useQuery(QUERY_ORDER_BY_ID, {
    variables: { getOrderByIdId: orderId },
  });
  const [offer, setOffer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [manualPrice, setManualPrice] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const order = data?.getOrderById;
  const nav = useNavigate();
  const [updateOrderData, { client }] = useMutation(MUTATION_NEGOTIATION_ORDER);
  const [rejectNegoData] = useMutation(MUTATION_REJECT_ORDER);

  const handlePriceChange = (e) => {
    setManualPrice(e.target.value);
  };

  const validateInput = () => {
    if (isNaN(manualPrice) || manualPrice <= 0) {
      showToast("error", "Please enter a valid price.");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateInput()) return;
    try {
      setIsLoading(true);
      if (!order) throw new Error("Order data is not available");
      await updateOrderData({
        variables: {
          updateNegoId: orderId,
          price: parseInt(manualPrice || order.offers[offer].price),
          aircraft: order.offers[offer].assetName,
          status: "Nego Sent",
          reason: "",
        },
        awaitRefetchQueries: [QUERY_GET_ORDERS],
      });
      console.log("Order updated successfully");
      setShowSaveModal(true);
      client.resetStore();
    } catch (error) {
      console.error(error);
      showToast("error", "Error updating order: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 p-4">
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50"
          style={{ display: isLoading ? "flex" : "none" }}
        >
          <Loading />
        </div>
      )}
      <div className="flex justify-center w-full mb-16">
        <img src={logo} alt="Logo" className="w-4/12" />
      </div>
      <div
        className={`w-full max-w-3xl bg-white rounded-lg shadow-md overflow-hidden ${
          isLoading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
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
              <p className="text-gray-600">{order?.fullname}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Aircraft
              </h2>
              <select
                name=""
                id=""
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                disabled={isLoading}
              >
                {order?.offers.map((offer, i) => (
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
              <p className="text-gray-600">{order?.origin}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Arrival
              </h2>
              <p className="text-gray-600">{order?.destination}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Price
              </h2>
              <input
                type="number"
                value={manualPrice || formatPrice(order?.offers[offer].price)}
                onChange={handlePriceChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                disabled={isLoading}
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Total Flight Time
              </h2>
              <p className="text-gray-600">
                {formatTime(order?.offers[offer].flightTimeInMinutes)}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 flex justify-center">
          <Button
            className="bg-indigo-700 hover:bg-blue-600 text-white"
            onClick={handleSave}
            disabled={isLoading}
          >
            Save
          </Button>
        </div>
      </div>
      {showSaveModal && (
        <Modal
          message="Order has been saved."
          onClose={() => {
            setShowSaveModal(false);
            nav("/dashboard");
          }}
        />
      )}
    </div>
  );
}
