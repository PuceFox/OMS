import { Button } from "@material-tailwind/react";
import formatPrice from "../utils/formatDollar";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ORDER_BY_ID, UPDATE_ORDER_DATA } from "../queries";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatTime } from "../utils/formatTime";

export function NegotiateOrder({ route }) {
  const { orderId } = useParams();
  const [queries] = useSearchParams();
  const [offer, setOffer] = useState(0);

  const price = queries.get("price");
  const nav = useNavigate();

  const { loading, error, data } = useQuery(QUERY_ORDER_BY_ID, {
    variables: {
      getOrderByIdId: orderId,
    },
  });

  const [updateNegotiate] = useMutation(UPDATE_ORDER_DATA);

  const [isLoading, setIsLoading] = useState(false);
  //   console.log(data?.getOrderById);

  const order = data?.getOrderById;

  console.log(order, `data order`);

  useEffect(() => {
    if (order && order.status !== "Pending") {
      nav("/form");
    }
  }, [order, nav]);

  async function submitOrder(event) {
    event.preventDefault();
    try {
      await updateNegotiate({
        variables: {
          updateOrderDataId: orderId,
          price: parseInt(price), // assuming price is an integer
          aircraft: order?.offers[offer].assetName,
          status: "Negotiate",
          reason: "", // you need to provide a reason or remove it from the mutation if it's not required
        },
        onError: (error) => {
          console.log(error);
        },
      });
      nav("/form");
    } catch (error) {
      // Handle error
      console.error("Error updating order:", error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-purple-800 p-6">
          <h1 className="text-3xl font-bold text-white">
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
            <Button className="w-full bg-green-600" onClick={submitOrder}>
              Negotiate
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
