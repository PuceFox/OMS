import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { MUTATION_LOGIN } from "../queries";
import logo from "../assets/logo.png";

export default function Login() {
  const [getLoginToken] = useMutation(MUTATION_LOGIN);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email format is invalid.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    return newErrors;
  };

  function loginUser() {
    const formErrors = validateForm();

    if (formErrors.email || formErrors.password) {
      setErrors(formErrors);
      return;
    }

    getLoginToken({
      variables: {
        password,
        email,
      },
      onCompleted: (data) => {
        localStorage.setItem("token", `Bearer ${data.login.token}`);
        navigate("/dashboard");
      },
      onError: (error) => {
        console.log(error.graphQLErrors[0].extensions.http.status);
        console.log("APOLLO ERROR");
        setErrors({
          email: "Invalid email or password.",
          password: "Invalid email or password.",
        });
      },
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 to-blue-300 py-6 flex flex-col justify-center sm:py-12">
      <div className="flex justify-center mt-6 mb-10">
        <img src={logo} alt="Logo" className="w-2/6 mb-6 mr-12" />
      </div>

      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-200 shadow-lg sm:-rotate-6 rounded-3xl"></div>
        <div className="relative px-6 py-10 bg-white shadow-lg rounded-3xl">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold text-gray-800">Sign In</h1>
              <h2 className="mt-2 text-md text-gray-900">
                Welcome back, please log in with your existing account
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-6 text-base leading-6 space-y-6 text-gray-700">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="text"
                    className="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-purple-400 transition duration-200 ease-in-out text-center"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm text-center w-full"
                  >
                    Email Address
                  </label>
                  {errors.email && (
                    <div className="text-red-500 text-sm mt-1 text-center">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-purple-400 transition duration-200 ease-in-out text-center"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm text-center w-full"
                  >
                    Password
                  </label>
                  {errors.password && (
                    <div className="text-red-500 text-sm mt-1 text-center">
                      {errors.password}
                    </div>
                  )}
                </div>

                <div className="flex justify-center mt-6">
                  <button
                    onClick={loginUser}
                    className="bg-purple-600 text-white rounded-md px-6 py-3 text-lg font-medium shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition ease-in-out duration-150"
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
  );
}
