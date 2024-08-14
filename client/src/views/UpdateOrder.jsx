import { Button } from "@material-tailwind/react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import logo from "../assets/logo.png";
import { useState } from "react";
import {
  MUTATION_NEGOTIATION_ORDER,
  QUERY_ORDER_BY_ID,
  UPDATE_ORDER_DATA,
  QUERY_GET_ORDERS,
  MUTATION_REJECT_ORDER,
} from "../queries";
import formatPrice from "../utils/formatDollar";
import { formatTime } from "../utils/formatTime";

export function UpdateOrder() {
  const { orderId } = useParams();
  const { loading, error, data } = useQuery(QUERY_ORDER_BY_ID, {
    variables: {
      getOrderByIdId: orderId,
    },
  });
  const [offer, setOffer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [manualPrice, setManualPrice] = useState(""); // added state for manual price
  const order = data?.getOrderById;

  const nav = useNavigate();
  const [updateOrderData, { loading: updateLoading, client }] = useMutation(
    MUTATION_NEGOTIATION_ORDER
  );
  const [rejectNegoData, { loading: rejectLoading }] = useMutation(
    MUTATION_REJECT_ORDER
  );

  const handlePriceChange = (e) => {
    setManualPrice(e.target.value);
  };

  const handleSave = async () => {
    if (!manualPrice) return; // don't update if no manual price is entered
    try {
      setIsLoading(true);
      if (!order) {
        throw new Error("Order data is not available");
      }
      await updateOrderData({
        variables: {
          updateNegoId: orderId,
          price: parseInt(manualPrice || order.offers[offer].price),
          aircraft: order.offers[offer].assetName,
          status: "Nego Sent",
          reason: "",
        },
        awaitRefetchQueries: [QUERY_GET_ORDERS]
        
      });
      client.resetStore();
      // alert("Order updated successfully!");
      nav("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Error updating order: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setIsLoading(true);
      if (!order) {
        throw new Error("Order data is not available");
      }
      await rejectNegoData({
        variables: {
          id: orderId,
          price: parseInt(manualPrice || order.offers[offer].price),
          aircraft: order.offers[offer].assetName,
          status: "Rejected",
          reason: "rejected after negotiation due to no update from user",
        },
      });
      // alert("Order rejected successfully!");
      nav("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Error rejecting order: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
              >
                {order?.offers.map((offer, i) => {
                  return <option value={i}>{offer.assetName}</option>;
                })}
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
        <div className="p-6 flex justify-center"> {/* Center the button */}
      <Button
        className="bg-indigo-700 hover:bg-blue-600 text-white"
        onClick={handleSave}
      >
        Save
      </Button>
    </div>
      </div>
    </div>
  );
}
