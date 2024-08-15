import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ORDER_BY_ID, UPDATE_ORDER_DATA } from "../queries/index";
import { Button, Radio } from "@material-tailwind/react";
import logo from "../assets/logo.png";

export function RejectOrder() {
  const { orderId } = useParams();
  const [updateReject] = useMutation(UPDATE_ORDER_DATA);
  const [reason, setReason] = useState("");
  const nav = useNavigate();

  function handleRadioChange(event) {
    setReason(event.target.value);
  }

  async function submitOrder(event) {
    event.preventDefault();
    try {
      await updateReject({
        variables: {
          updateOrderDataId: orderId,
          price: "cancel",
          aircraft: "No Flights",
          status: "Rejected",
          reason: reason,
        },
        onError: (error) => {
          console.log(error);
        },
      });
      nav("/form");
    } catch (error) {
      console.error("Error updating order:", error);
    }
  }

  const { loading, error, data } = useQuery(QUERY_ORDER_BY_ID, {
    variables: {
      getOrderByIdId: orderId,
    },
  });

  const order = data?.getOrderById;

  useEffect(() => {
    if (order && order.status !== "Pending" && order.status !== "Negotiation" && order.status !== "Nego Sent") {
      nav("/form");
    }
  }, [order, nav]);  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 p-4">
      <div className="flex justify-center w-full">
        <img src={logo} alt="Logo" className="w-4/12 mb-16 " />
      </div>
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg overflow-hidden mb-14">
        <div className="bg-purple-800 p-6 rounded-t-lg">
          <h1 className="text-2xl font-bold text-white text-center">
            Tell Us Why You Decline?
          </h1>
        </div>
        <form onSubmit={submitOrder}>
          <div className="p-6 space-y-4">
            <div className="flex items-center">
              <Radio
                name="type"
                label={
                  <span className="text-xl font-black text-gray-800">
                    I changed my mind
                  </span>
                }
                value="I changed my mind"
                checked={reason === "I changed my mind"}
                onChange={handleRadioChange}
                className="text-gray-800 border-2 border-gray-800 rounded-lg"
              />
            </div>
            <div className="flex items-center">
              <Radio
                name="type"
                label={
                  <span className="text-xl font-black text-gray-800">
                    Price is too expensive
                  </span>
                }
                value="Price is too expensive"
                checked={reason === "Price is too expensive"}
                onChange={handleRadioChange}
                className="text-gray-800 border-2 border-gray-800 rounded-lg"
              />
            </div>
            <div className="flex items-center">
              <Radio
                name="type"
                label={
                  <span className="text-xl font-black text-gray-800">
                    Deterioration
                  </span>
                }
                value="Deterioration"
                checked={reason === "Deterioration"}
                onChange={handleRadioChange}
                className="text-gray-800 border-2 border-gray-800 rounded-lg"
              />
            </div>
          </div>
          <div className="p-6 m-auto w-fit">
            <Button
              type="submit"
              className="w-full  bg-indigo-700 hover:bg-red-900 text-white"
            >
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
