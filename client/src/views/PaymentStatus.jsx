import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { MUTATION_SEND_INVOICE, QUERY_ORDER_BY_ID } from "../queries";

export default function PaymentSuccess() {
  const { orderId } = useParams()
  const { loading, error, data } = useQuery(QUERY_ORDER_BY_ID, {
    variables: {
      getOrderByIdId: orderId,
    },
  });
  const order = data?.getOrderByIdId
  const [sendInvoice] = useMutation(MUTATION_SEND_INVOICE)
  // const [updatePaymentStatus] = useMutation()

  useEffect(() => {
    if (orderId) {
      sendInvoice({
        variables: {
          generateInvoiceId : orderId
        }
      });
    }
  }, [orderId, sendInvoice]);

  return (  
    <>
      <style>
        {`
          body {
            margin: 0;
            font-family: 'Arial', sans-serif;
            background: linear-gradient(to right, #a2c2e8, #e0aaff); /* Soft gradient from light blue to lavender */
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            padding: 0;
            box-sizing: border-box;
            position: relative;
            overflow: hidden; /* Hide any overflow for a clean look */
          }

          /* Decorative background elements */
          .decorative-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.2); /* Lighter overlay for a softer effect */
            clip-path: circle(50% at 40% 40%);
            z-index: 0;
            pointer-events: none;
            filter: blur(8px); /* Slight blur effect */
          }

          .page-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100vh;
            width: 100%;
            padding: 2rem;
            box-sizing: border-box;
            z-index: 1; /* Ensure it's above the background ornament */
            position: relative;
            text-align: center;
          }

          .logo {
            width: 500px; /* Adjusted logo size */
            margin-bottom: 1rem;
            margin-top: 5rem;
            border-radius: 12px;
            // box-shadow: 0 0 15px rgba(255, 255, 255, 0.2); /* Soft glow */
            // background: rgba(255, 255, 255, 0.05); /* Very subtle white background */
            padding: 10px;
            transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transition effect */
          }

          .logo:hover {
            transform: scale(1.03); /* Slightly enlarge logo on hover */
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.4); /* Slightly stronger glow on hover */
          }

          .message-container {
            margin-top: 2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: rgba(255, 255, 255, 0.3); /* Slightly transparent white */
            border-radius: 25px;
            padding: 2rem;
            max-width: 600px;
            width: 100%;
            text-align: center;
            position: relative;
            z-index: 1; /* Ensure it's above the decorative element */
            backdrop-filter: blur(5px); /* Slight blur for a frosted glass look */
            border: 1px solid rgba(255, 255, 255, 0.15); /* Light border for subtle contrast */
          }

          h1 {
            font-size: 2.2rem;
            color: #6d5eac; /* Soft lavender color */
            margin-bottom: 1rem;
            font-weight: 600;
            text-shadow: 0 0 6px rgba(109, 94, 172, 0.2); /* Soft glow */
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
            background: linear-gradient(to right, #6d5eac, #e0aaff); /* Gradient underline */
            border-radius: 5px;
          }

          p {
            font-size: 1.1rem;
            color: #333;
            margin: 0;
            line-height: 1.5;
          }

          .additional-message-container {
            margin-top: 2rem;
            width: 100%;
            max-width: 800px;
            padding: 1.5rem;
            background: rgba(255, 255, 255, 0.4); /* Light background for contrast */
            border: 1px solid #6d5eac; /* Soft lavender border */
            border-radius: 25px; /* Rounded corners */
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Soft shadow for depth */
            text-align: center;
            position: relative;
            z-index: 1; /* Ensure it's above the decorative element */
            font-size: 1rem;
            color: #333;
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

            .additional-message-container {
              padding: 1rem;
              font-size: 0.9rem;
            }
          }
        `}
      </style>

      <div className="decorative-background"></div>

      <div className="page-container">
        <img src={logo} alt="Logo" className="logo" />
        <div className="message-container">
          <h1>Payment Successful</h1>
          <p>Thank you for your payment.</p>
          <p>Your transaction has been successfully completed.</p>
        </div>

        <div className="additional-message-container">
          <p>
            We look forward to assisting you with your future plans with
            Orderly!
          </p>
        </div>
      </div>
    </>
  );
}
