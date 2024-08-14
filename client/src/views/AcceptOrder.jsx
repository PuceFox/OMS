import { Button } from "@material-tailwind/react";
import formatPrice from "../utils/formatDollar";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ORDER_BY_ID, UPDATE_ORDER_DATA } from "../queries";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatTime } from "../utils/formatTime";
import logo from "../assets/logo.png";
import Loading from "../components/Loading";

export function AcceptOrder({ route }) {
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

  const [updateOrder, { data: updateOrderData }] =
    useMutation(UPDATE_ORDER_DATA);

  const [isLoading, setIsLoading] = useState(false);

  const order = data?.getOrderById;

  // console.log(order);
  useEffect(() => {
    if (order && order.status !== "Pending") {
      nav("/form");
    }
  }, [order, nav]);

  async function submitOrder() {
    setIsLoading(true);
    updateOrder({
      variables: {
        updateOrderDataId: orderId,
        price: Number(order?.offers[offer].price),
        aircraft: order?.offers[offer].assetName,
        status: "Accepted",
      },
      onCompleted: (data) => {
        nav(`/payment/${orderId}`);
      },
      onError: (error) => {
        console.log(error.graphQLErrors);
        setIsLoading(false);
      },
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 p-4">
      <div className="flex justify-center w-full">
        <img src={logo} alt="Logo" className="w-4/12 mb-16" />
      </div>
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-purple-800 p-6">
          <h1 className="text-3xl font-bold text-white">
            Confirm Service Order
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
            <Loading />
          ) : (
            <Button
              className="w-full  bg-indigo-700 hover:bg-green-600"
              onClick={submitOrder}
            >
              Confirm
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
