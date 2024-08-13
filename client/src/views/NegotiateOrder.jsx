import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  MUTATION_SEND_NEGOTIATION_EMAIL,
  QUERY_ORDER_BY_ID,
  UPDATE_ORDER_DATA,
} from "../queries";
import formatPrice from "../utils/formatDollar";
import { formatTime } from "../utils/formatTime";
import { Button } from "@material-tailwind/react";

export function NegotiateOrder() {
  const { orderId } = useParams();
  const [queries] = useSearchParams();
  const price = queries.get("price");
  const [offer, setOffer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(QUERY_ORDER_BY_ID, {
    variables: {
      getOrderByIdId: orderId,
    },
  });

  const order = data?.getOrderById;

  const [sendNegotiationEmail] = useMutation(MUTATION_SEND_NEGOTIATION_EMAIL);
  const [updateOrder] = useMutation(UPDATE_ORDER_DATA);

  useEffect(() => {
    if (orderId) {
      sendNegotiationEmail({
        variables: {
          orderId: orderId,
          email: order?.email,
          fullname: order?.fullname,
          aircraft: order?.offers[offer].assetName,
          price: parseInt(price),
        },
      });
    }
  }, [orderId, sendNegotiationEmail, order, offer, price]);

  async function submitNegotiate(event) {
    event.preventDefault();
    try {
      setIsLoading(true);
      await updateOrder({
        variables: {
          updateOrderDataId: orderId,
          price: parseInt(price),
          aircraft: order?.offers[offer].assetName,
          status: "Negotiate",
          reason: "",
        },
      });

      await sendNegotiationEmail({
        variables: {
          orderId: orderId,
          email: order.email,
          fullname: order.fullname,
          aircraft: order?.offers[offer].assetName,
          price: parseInt(price),
        },
      });

      navigate("/");
    } catch (error) {
      console.error("Error updating order and sending email:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 p-4">
      <div className="flex justify-center w-full">
        <img src={logo} alt="Logo" className="w-4/12 mb-28" />
      </div>
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-purple-800 p-6">
          <h1 className="text-3xl font-bold text-white text-center">
            Negotiate Service Order
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
              <p className="text-gray-600">
                {formatPrice(order?.offers[offer].price)}
              </p>
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
        <div className="p-6 m-auto  w-fit">
          {isLoading ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : (
            <Button
              onClick={submitNegotiate}
              className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit Negotiation
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
