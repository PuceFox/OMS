import { useMutation, useQuery } from "@apollo/client";
import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { GET_STRIPE_CLIENT, QUERY_ORDER_BY_ID } from "../queries";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { REST_API_URL } from "../constant/constant";

import { motion } from "framer-motion";

import logo from "../assets/name.png";

export default function Payment() {
  const params = useParams();
  const stripePromise = loadStripe(
    "pk_test_51Pm2VjRwE7EqePmeCvWiUYtLPuv6V48ftkXigvelAdj2GxmKaf1Imyv8twGAnDDRM4TKnA23d20xAFmRCHQ8hpeV00A21Qjhdm"
  );

  const { orderId } = params;

  const { data: orderData } = useQuery(QUERY_ORDER_BY_ID, {
    variables: {
      getOrderByIdId: orderId,
    },
  });

  const fetchClientSecret = useCallback(() => {
    return fetch(`${REST_API_URL}/create-checkout-session/${orderId}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [orderId]);

  const options = { fetchClientSecret };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 text-white shadow-lg z-20">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 py-4 flex justify-between items-center max-w-7xl"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-purple-800 font-bold text-xl">O</span>
            </div>
            <h1 className="font-bold text-2xl text-white">Orderly</h1>
          </div>
        </motion.div>
      </nav>
      <div className="relative w-full h-screen bg-gradient-to-r from-blue-300 via-indigo-600 to-purple-800 opacity-80">
        <br />
        <h1 className="text-center mt-16 text-6xl font-serif mb-8 bg-gradient-to-r from-purple-500 via-blue-200 to-blue-500 bg-clip-text text-transparent shadow-lg stroke-effect">
          PAYMENT PAGE
        </h1>
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full flex justify-center z-30">
          <img src={logo} alt="Logo" className="w-4/12 t" />
        </div>
      </div>
    </>
  );
}
