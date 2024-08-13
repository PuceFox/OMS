import { useMutation, useQuery } from "@apollo/client";
import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { QUERY_ORDER_BY_ID } from "../queries";
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

  const { data: orderData, loading, error } = useQuery(QUERY_ORDER_BY_ID, {
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
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;
  return (
    <>
      {orderData?.getOrderById?.status === "Paid" ? (
        <>
          <style>
            {`
          body {
            margin: 0;
            font-family: 'Arial', sans-serif;
            background: linear-gradient(to right, #a2c2e8, #e0aaff); 
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            padding: 0;
            box-sizing: border-box;
            position: relative;
            overflow: hidden; 
          }
          .decorative-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.2); 
            clip-path: circle(50% at 40% 40%);
            z-index: 0;
            pointer-events: none;
            filter: blur(8px);
          }

          .page-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100vh;
            width: 100%;
            padding: 2rem;
            box-sizing: border-box;
            z-index: 1;
            position: relative;
            text-align: center;
          }

          .logo {
            width: 500px; /* Adjusted logo size */
            margin-bottom: 1rem;
            margin-top: 5rem;
            border-radius: 12px;
            // box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
            // background: rgba(255, 255, 255, 0.05);
            padding: 10px;
            transition: transform 0.3s ease, box-shadow 0.3s ease; 
          }

          .logo:hover {
            transform: scale(1.03);
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.4);
          }

          .message-container {
            margin-top: 2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 25px;
            padding: 2rem;
            max-width: 600px;
            width: 100%;
            text-align: center;
            position: relative;
            z-index: 1;
            backdrop-filter: blur(5px); 
            border: 1px solid rgba(255, 255, 255, 0.15);
          }

          h1 {
            font-size: 2.2rem;
            color: #6d5eac; 
            margin-bottom: 1rem;
            font-weight: 600;
            text-shadow: 0 0 6px rgba(109, 94, 172, 0.2); 
            position: relative;
          }

          h1::before {
            content: '';
            position: absolute;
            left: 50%;
            bottom: -8px;
            transform: translateX(-50%);
            width: 50%;
            height: 2px;
            background: linear-gradient(to right, #6d5eac, #e0aaff);
            border-radius: 5px;
          }

          p {
            font-size: 1.1rem;
            color: #333;
            margin: 0;
            line-height: 1.5;
          }

          @media (max-width: 768px) {
            .message-container {
              padding: 1rem;
            }

            h1 {
              font-size: 1.8rem;
            }

            p {
              font-size: 1rem;
            }
          }
        `}
          </style>
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
          <div className="decorative-background"></div>
          <div className="page-container">
            <img src={logo} alt="Logo" className="logo" />
            <div className="message-container">
              <h1>This Order has been Paid</h1>
              <p>Thank you for your payment.</p>
              <p>Your transaction has been successfully completed.</p>
            </div>
          </div>
        </>
      ) : (
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
          <div className="relative w-full h-screen bg-white opacity-80">
            <div className="flex justify-center items-center mt-1">
              <h2 className="text-center mt-24 text-4xl font-serif mb-10 bg-gradient-to-r from-purple-800 via-blue-400 to-blue-600 bg-clip-text text-current shadow-sm inline-block border-b-4 border-indigo-500 pb-2">
                Please fill in the details to complete your payment
              </h2>
            </div>
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        </>
      )}
    </>
  );
}
