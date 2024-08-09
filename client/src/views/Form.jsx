import Select from "react-select";
import { useMutation, useQuery } from "@apollo/client";
import { GET_AIRPORTS, GET_SERVICES, MUTATION_ADD_ORDER } from "../queries";
import { useState } from "react";
// import { Link } from "react-router-dom";

export default function Form() {
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
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
    },
  });

  if (airportLoading || serviceLoading)
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Please wait, we are fetching data...</p>
      </div>
    );
  if (airportError || serviceError)
    return <p>Error! {airportError?.message || serviceError?.message}</p>;

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

  const handleSubmit = async (event) => {
    event.preventDefault();
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
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
    }),
    placeholder: (provided) => ({
      ...provided,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      margin: 0,
      padding: 0,
      textAlign: "center",
      fontSize: "1.125rem",
      color: "#9CA3AF",
    }),
    valueContainer: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.5rem",
    }),
    singleValue: (provided) => ({
      ...provided,
      textAlign: "center",
    }),
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&family=Lora:wght@400&display=swap');

          h1 {
            font-family: 'Roboto', sans-serif;
            font-size: 2.5rem;
            font-weight: 700;
            color: #333;
            text-align: center;
            margin-bottom: 1.5rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
          }

          h2 {
            font-family: 'Lora', serif;
            font-size: 1.5rem;
            font-weight: 400;
            color: #666;
            text-align: center;
            margin-bottom: 2rem;
            font-style: italic;
          }

          .origin-0 {
            transform-origin: 0%;
          }

          input:focus ~ .placeholder-text,
          input:not(:placeholder-shown) ~ .placeholder-text,
          .react-select__control:focus ~ .placeholder-text,
          .react-select__control:not(:placeholder-shown) ~ .placeholder-text {
            --tw-translate-x: 0;
            --tw-translate-y: 0;
            --tw-rotate: 0;
            --tw-skew-x: 0;
            --tw-skew-y: 0;
            transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate))
              skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
            --tw-scale-x: 0.75;
            --tw-scale-y: 0.75;
            --tw-translate-y: -1.5rem;
          }

          input:focus ~ .placeholder-text,
          .react-select__control:focus ~ .placeholder-text {
            --tw-text-opacity: 1;
            color: rgba(0, 0, 0, var(--tw-text-opacity));
            left: 50%;
            transform: translateX(-50%) translateY(-50%) scale(0.75);
            top: 0.25rem;
          }

          .form-input {
            position: relative;
            width: 100%;
            margin-bottom: 1.5rem;
            border-bottom: 2px solid #CBD5E0;
          }

          .placeholder-text {
            position: absolute;
            top: 50%;
            left: 50%;
            color: #9CA3AF;
            transition: all 0.3s ease;
            pointer-events: none;
            transform: translate(-50%, -50%);
            text-align: center;
          }

          .form-input input,
          .react-select__control {
            width: 100%;
            padding: 1rem;
            font-size: 1.125rem;
            background-color: transparent;
            border: none;
            outline: none;
          }

          .react-select__control {
            border-bottom: 2px solid #CBD5E0;
          }

          .react-select__placeholder {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #9CA3AF;
            font-size: 1.125rem;
          }

          .react-select__menu {
            font-size: 1.125rem;
          }

          .react-select__value-container {
            padding: 0.5rem;
            justify-content: center;
          }
        `}
      </style>
      <div className="min-h-screen bg-gray-100 p-0 sm:p-12">
        <div className="mx-auto max-w-3xl px-8 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
          <h1>Input Form</h1>
          <h2>Please fill in your details...</h2>
          <form id="form" noValidate onSubmit={handleSubmit}>
            <div className="form-input">
              <input
                type="text"
                name="fullname"
                placeholder=" "
                value={form.fullname}
                onChange={(e) => onChangeForm("fullname", e.target.value)}
                required
              />
              <div className="placeholder-text">Full Name</div>
            </div>
            <div className="form-input">
              <input
                type="email"
                name="email"
                placeholder=" "
                value={form.email}
                onChange={(e) => onChangeForm("email", e.target.value)}
                required
              />
              <div className="placeholder-text">Email Address</div>
            </div>
            <div className="form-input">
              <input
                type="tel"
                name="phoneNumber"
                placeholder=" "
                value={form.phoneNumber}
                onChange={(e) => onChangeForm("phoneNumber", e.target.value)}
                required
              />
              <div className="placeholder-text">Phone Number</div>
            </div>
            <div className="form-input">
              <Select
                id="origin"
                name="origin"
                value={originSelect}
                onChange={(option) => {
                  onChangeForm("origin", option?.value || "");
                  setOriginSelect(option);
                }}
                options={renderAirportOptions(airports)}
                placeholder="Select Origin City"
                styles={customStyles}
              />
            </div>
            <div className="form-input">
              <Select
                id="destination"
                name="destination"
                value={destinationSelect}
                onChange={(option) => {
                  onChangeForm("destination", option?.value || "");
                  setDestinationSelect(option);
                }}
                options={renderAirportOptions(airports)}
                placeholder="Select Destination City"
                styles={customStyles}
              />
            </div>
            <div className="form-input">
              <Select
                id="service"
                name="service"
                value={serviceSelect}
                onChange={(option) => {
                  onChangeForm("service", option?.value || "");
                  setServiceSelect(option);
                }}
                options={renderServiceOptions(services)}
                placeholder="Select Service"
                styles={customStyles}
              />
            </div>
            <div className="form-input">
              <input
                type="number"
                name="pax"
                placeholder=" "
                value={form.pax}
                onChange={(e) => onChangeForm("pax", e.target.value)}
                required
              />
              <div className="placeholder-text">Number of Passengers</div>
            </div>
            <button
              className="mt-4 w-full px-6 py-3 bg-purple-800 text-white font-bold text-lg rounded-xl shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-opacity-50"
              type="submit"
            >
              Submit
            </button>
          </form>
          {showModal && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Success!</h2>
                <p>
                  Your order has been received, please check your email for
                  price estimation
                </p>
                <button
                  onClick={closeModal}
                  className="mt-4 ml-56 px-6 py-3 bg-purple-800 text-white font-bold text-lg rounded-xl shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-opacity-50"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f3f3f3",
  },
  spinner: {
    border: "16px solid #f3f3f3",
    borderRadius: "50%",
    borderTop: "16px solid #3498db",
    width: "120px",
    height: "120px",
    animation: "spin 2s linear infinite",
  },
  loadingText: {
    marginLeft: "20px",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#3498db",
  },
};
