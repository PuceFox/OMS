import React, { useState } from "react";
import Select from "react-select";
import { useMutation, useQuery } from "@apollo/client";
import { GET_AIRPORTS, GET_SERVICES, MUTATION_ADD_ORDER } from "../queries";
import Logo from "../assets/name.png";
import { IoMdMenu } from "react-icons/io";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "2px solid #CBD5E0",
    boxShadow: "none",
    "&:hover": {
      border: "2px solid #7c3aed",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#9CA3AF",
    fontSize: "1.125rem",
    textAlign: "center",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#333",
    textAlign: "center",
  }),
  menu: (provided) => ({
    ...provided,
    fontSize: "1.125rem",
  }),
  menuList: (provided) => ({
    ...provided,
    textAlign: "center",
  }),
  option: (provided) => ({
    ...provided,
    textAlign: "center",
  }),
};

const NavbarMenu = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Services", path: "/" },
  { id: 3, title: "Testimonials", path: "/" },
  { id: 4, title: "About Us", path: "/" },
];

const Form = () => {
  const {
    data: airportData,
    loading: airportLoading,
    error: airportError,
  } = useQuery(GET_AIRPORTS);
  const {
    data: serviceData,
    loading: serviceLoading,
    error: serviceError,
  } = useQuery(GET_SERVICES);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    origin: "",
    destination: "",
    service: "",
    pax: "",
  });
  const [originSelect, setOriginSelect] = useState(null);
  const [destinationSelect, setDestinationSelect] = useState(null);
  const [serviceSelect, setServiceSelect] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [addOrder] = useMutation(MUTATION_ADD_ORDER, {
    onCompleted: () => {
      setForm({
        fullname: "",
        email: "",
        phoneNumber: "",
        origin: "",
        destination: "",
        service: "",
        pax: "",
      });
      setOriginSelect(null);
      setDestinationSelect(null);
      setServiceSelect(null);
      setShowModal(true);
      setLoading(false);
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
      setLoading(false);
    },
  });

  if (airportLoading || serviceLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            border: "16px solid #f3f3f3",
            borderRadius: "50%",
            borderTop: "16px solid #3498db",
            width: "120px",
            height: "120px",
            animation: "spin 2s linear infinite",
          }}
        ></div>
        <p style={{ marginTop: "1rem", fontSize: "1.25rem", color: "#333" }}>
          Please wait, we are fetching data...
        </p>
      </div>
    );
  }

  if (airportError || serviceError) {
    return <p>Error! {airportError?.message || serviceError?.message}</p>;
  }

  const airports = airportData?.getAirport || [];
  const services = serviceData?.getService || [];

  const renderAirportOptions = (airports) => {
    return airports.map((airport) => ({
      value: airport.iataCode,
      label: `${airport.city} - ${airport.airport} (${airport.iataCode})`,
    }));
  };

  const renderServiceOptions = (services) => {
    return services.map((service) => ({
      value: service.type,
      label: service.type,
    }));
  };

  const onChangeForm = (key, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [key]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (form.origin === form.destination) {
      newErrors.origin = "Origin and Destination fields must be different";
      newErrors.destination = "Origin and Destination fields must be different";
    }
    if (!form.fullname) newErrors.fullname = "Full name is required";
    if (!form.email) newErrors.email = "Email address is required";
    if (!form.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!form.origin) newErrors.origin = "Origin city is required";
    if (!form.destination)
      newErrors.destination = "Destination city is required";
    if (!form.service) newErrors.service = "Service type is required";
    if (!form.pax || isNaN(form.pax) || parseInt(form.pax, 10) <= 0)
      newErrors.pax = "Number of passengers is required";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setLoading(true);
    try {
      await addOrder({
        variables: {
          input: {
            fullname: form.fullname,
            email: form.email,
            phoneNumber: form.phoneNumber,
            origin: form.origin,
            destination: form.destination,
            service: form.service,
            pax: parseInt(form.pax, 10),
          },
        },
      });
    } catch (error) {
      console.error("Submit Error:", error);
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&family=Lora:wght@400&display=swap');

          body {
            margin: 0;
            font-family: 'Roboto', sans-serif;
            background: linear-gradient(to right, #6e48aa, #9d50bb);
          }

          .navbar {
            background: linear-gradient(to right, #4a4a4a, #6e48aa);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 20;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .navbar a {
            color: white;
            text-decoration: none;
            font-size: 1rem;
            margin: 0 1rem;
            padding: 0.5rem;
            border-radius: 5px;
            transition: background 0.3s ease;
          }

          .navbar a:hover {
            background: rgba(255, 255, 255, 0.1);
          }

          h1 {
            font-family: 'Roboto', sans-serif;
            font-size: 2rem;
            font-weight: 700;
            color: black;
            text-align: center;
            margin-bottom: 1rem;
            margin: 0;

            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          }
          .navbar h1 {
            margin: 0;
            font-size: 1.5rem;
            color: white;
          }

          .form-input {
            position: relative;
            width: 100%;
            margin-bottom: 2rem;
          }

          .form-input input {
            width: 100%;
            padding: 0.75rem;
            font-size: 1rem;
            background-color: transparent;
            border: none;
            outline: none;
            border-bottom: 2px solid #CBD5E0;
            text-align: center;
            color: #000;
          }

          .form-input input::placeholder {
            color: #9CA3AF;
            font-size: 1rem;
            text-align: center;
          }

          .form-input input:focus::placeholder,
          .form-input input:not(:placeholder-shown)::placeholder {
            color: #7c3aed;
            font-size: 0.75rem;
          }

          .error-message {
            color: #f7c6c7;
            font-size: 0.75rem;
            margin-top: 0.25rem;
            text-align: center;
          }

          .form-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            padding-top: 4rem; /* Adjust for navbar height */
          }

          .form-box {
            width: 100%;
            max-width: 500px;
            padding: 1.5rem;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            text-align: center;
          }

          .logo {
            display: block;
            margin: 0 auto 1.5rem;
            max-width: 150px;
          }

          .loading-spinner {
            border: 16px solid #f3f3f3;
            border-radius: 50%;
            border-top: 16px solid #3498db;
            width: 120px;
            height: 120px;
            animation: spin 2s linear infinite;
            margin: 0 auto;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .futuristic-button {
            background: #6e48aa;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: bold;
            transition: background 0.3s ease;
            margin-top: 1rem;
            display: block;
            margin-left: auto;
            margin-right: auto;
          }

          .futuristic-button:hover {
            background: #9d50bb;
          }

          .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            text-align: center;
            max-width: 500px;
            margin: 0 auto;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          .modal-content h2 {
            margin-bottom: 1rem;
            color: #333;
          }

          .modal-content button {
            background: #6e48aa;
            color: white;
            border: none;
            padding: 0.5rem 1.5rem;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s ease;
          }

          .modal-content button:hover {
            background: #9d50bb;
          }

          .service-description {
            font-size: 0.875rem;
            color: #666;
            margin-top: 0.5rem;
            text-align: left;
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
          <div className="hidden lg:flex flex-grow justify-end">
            <ul className="flex items-center gap-12">
              {NavbarMenu.map((menu) => (
                <li key={menu.id}>
                  <Link
                    to={menu.path}
                    className="relative group text-white font-semibold text-lg transition duration-300 hover:text-blue-300"
                  >
                    {menu.title}
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-300 transition-transform duration-300 scale-x-0 group-hover:scale-x-100 origin-left"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:hidden">
            <IoMdMenu className="text-4xl text-white hover:text-blue-300 transition duration-300" />
          </div>
        </motion.div>
      </nav>

      <div className="form-container">
        <div className="form-box">
          <img src={Logo} alt="Logo" className="logo" />
          <h1 className="text-deep-purple-800">
            Please fill in your details...
          </h1>
          <form id="form" noValidate onSubmit={handleSubmit}>
            <div className="form-input">
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={form.fullname}
                onChange={(e) => onChangeForm("fullname", e.target.value)}
              />
              {errors.fullname && (
                <div className="error-message">{errors.fullname}</div>
              )}
            </div>
            <div className="form-input">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => onChangeForm("email", e.target.value)}
              />
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>
            <div className="form-input">
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={form.phoneNumber}
                onChange={(e) => onChangeForm("phoneNumber", e.target.value)}
              />
              {errors.phoneNumber && (
                <div className="error-message">{errors.phoneNumber}</div>
              )}
            </div>
            <div className="form-input">
              <Select
                styles={customStyles}
                value={originSelect}
                onChange={(selectedOption) => {
                  setOriginSelect(selectedOption);
                  onChangeForm("origin", selectedOption?.value || "");
                }}
                options={renderAirportOptions(airports)}
                placeholder="Select Origin City"
              />
              {errors.origin && (
                <div className="error-message">{errors.origin}</div>
              )}
            </div>
            <div className="form-input">
              <Select
                styles={customStyles}
                value={destinationSelect}
                onChange={(selectedOption) => {
                  setDestinationSelect(selectedOption);
                  onChangeForm("destination", selectedOption?.value || "");
                }}
                options={renderAirportOptions(airports)}
                placeholder="Select Destination City"
              />
              {errors.destination && (
                <div className="error-message">{errors.destination}</div>
              )}
            </div>
            <div className="form-input">
              <Select
                styles={customStyles}
                value={serviceSelect}
                onChange={(selectedOption) => {
                  setServiceSelect(selectedOption);
                  onChangeForm("service", selectedOption?.value || "");
                }}
                options={renderServiceOptions(services)}
                placeholder="Select Service Type"
              />
              {errors.service && (
                <div className="error-message">{errors.service}</div>
              )}
              <div className="service-description">
                - VIP: Premium service with extra comfort.
                <br />
                - Madevac: Medical evacuation service.
                <br />- Citytour: Guided city tours.
              </div>
            </div>
            <div className="form-input">
              <input
                type="number"
                name="pax"
                placeholder="Number of Passengers"
                value={form.pax}
                onChange={(e) => onChangeForm("pax", e.target.value)}
              />
              {errors.pax && <div className="error-message">{errors.pax}</div>}
            </div>
            <button
              type="submit"
              className="futuristic-button"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
        {showModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="modal-content">
              <h1>Success!</h1>
              <p>
                Your order has been received, please check your email for price
                estimation.
              </p>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Form;
