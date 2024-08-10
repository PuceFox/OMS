import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_STRIPE_CLIENT, QUERY_ORDER_BY_ID } from "../queries";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";

export default function Payment() {
  const params = useParams();
  const stripePromise = loadStripe(
    "pk_test_51Pm2VjRwE7EqePmeCvWiUYtLPuv6V48ftkXigvelAdj2GxmKaf1Imyv8twGAnDDRM4TKnA23d20xAFmRCHQ8hpeV00A21Qjhdm"
  );

  const {orderId} = params;
  const [clientSecret, setClientSecret] = useState("")
  const [fetchClient, {data, loading}] = useMutation(GET_STRIPE_CLIENT);
  const { data: orderData } = useQuery(QUERY_ORDER_BY_ID, {
    variables: {
      getOrderByIdId: orderId
    },
  });

  useEffect(() => {
    
    
    fetchClient({
      variables: {
        orderId
      },
      onCompleted: (data) => {
        console.log(data);
        setClientSecret(data.getClientStripeSession.clientSecret)
      }
    })
  }, [])
  

  return (
    <>
      <div>
        <h1>PAYMENT PAGE</h1>
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ fetchClientSecret: clientSecret }}
        >

          <EmbeddedCheckout/>
        </EmbeddedCheckoutProvider>
      </div>
    </>
  );
}
