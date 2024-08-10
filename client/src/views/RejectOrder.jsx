import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPDATE_ORDER_DATA } from '../queries/index'; 
import { Button, Radio } from "@material-tailwind/react";
export function RejectOrder() {
  const { orderId } = useParams();
  const [updateReject] = useMutation(UPDATE_ORDER_DATA);
  const [reason, setReason] = useState("");
  console.log(orderId);
  console.log(reason);
  
  const nav = useNavigate()

  function handleRadioChange(event) {
    setReason(event.target.value);
  }

  async function submitOrder(event) {
    event.preventDefault();
    try {
      await updateReject({
        variables: {
          updateOrderDataId: orderId,
          price: 0,
          aircraft: "No Flights",
          status: "Rejected",
          reason: reason
        },
        onError: (error) => {
          console.log(error);
          
        }
      });
      nav("/form")
    } catch (error) {
      // Handle error
      console.error("Error updating order:", error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-purple-800 p-6">
          <h1 className="text-3xl font-bold text-white">Tell Us Why You Decline ?</h1>
        </div>
        <form onSubmit={submitOrder}>
          <div className="p-6">
            <div className="grid">
              <Radio
                name="type"
                label="I changed my mind"
                value="I changed my mind"
                checked={reason === "I changed my mind"}
                onChange={handleRadioChange}
              />
              <Radio
                name="type"
                label="Price is too expensive"
                value="Price is too expensive"
                checked={reason === "Price is too expensive"}
                onChange={handleRadioChange}
              />
              <Radio
                name="type"
                label="Deterioration"
                value="Deterioration"
                checked={reason === "Deterioration"}
                onChange={handleRadioChange}
              />
            </div>
          </div>
          <div className="p-6 m-auto w-fit">
            <Button type="submit" className="w-full bg-green-600">
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
