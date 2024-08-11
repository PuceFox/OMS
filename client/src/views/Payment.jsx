import { useMutation, useQuery } from "@apollo/client";
import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { GET_STRIPE_CLIENT, QUERY_ORDER_BY_ID } from "../queries";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { REST_API_URL } from "../constant/constant";

export default function Payment() {
  const params = useParams();
  const stripePromise = loadStripe(
    "pk_test_51Pm2VjRwE7EqePmeCvWiUYtLPuv6V48ftkXigvelAdj2GxmKaf1Imyv8twGAnDDRM4TKnA23d20xAFmRCHQ8hpeV00A21Qjhdm"
  );

  const {orderId} = params;
  
  const { data: orderData } = useQuery(QUERY_ORDER_BY_ID, {
    variables: {
      getOrderByIdId: orderId
    },
  });
  

  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch(`${REST_API_URL}/create-checkout-session/${orderId}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);
  
  const options = {fetchClientSecret};

  return (
    <>
      <div>
        <h1>PAYMENT PAGE</h1>
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={options}
        >

          <EmbeddedCheckout/>
        </EmbeddedCheckoutProvider>
      </div>
    </>
  );
}
