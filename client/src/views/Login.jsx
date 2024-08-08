import axios from "axios";
import { EXPRESS_API_URL } from "../constant/constant";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ApolloError, useMutation } from "@apollo/client";
import { MUTATION_LOGIN } from "../queries";

export default function Login() {
  const [getLoginToken, { data }] = useMutation(MUTATION_LOGIN);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  function loginUser() {
    try {
      const response = getLoginToken({
        variables: {
          password,
          email,
        },
        onCompleted: (data) => {
          localStorage.setItem("token", `Bearer ${data.login.token}`);
          navigate("/dashboard");
          // console.log(localStorage.token);
        },
        onError: (error) => {
          console.log(error.graphQLErrors[0].extensions.http.status);
          console.log("APOLLO ERROR");
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-purple-800 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="text-center">
                <h1 className="text-2xl font-semibold">Sign Up</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-purple-800"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-purple-800"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>

                  <div className="relative flex justify-center">
                    <button
                      onClick={loginUser}
                      className="bg-blue-500 text-white rounded-md px-4 py-2 text-sm font-medium shadow-md hover:bg-purple-800 focus:outline-none focus:ring-2  focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
