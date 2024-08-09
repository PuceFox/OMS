import Select from "react-select";
import { useMutation, useQuery } from "@apollo/client";
import { GET_AIRPORTS, GET_SERVICES, MUTATION_ADD_ORDER } from "../queries";
import { useState } from "react";
import { Link } from "react-router-dom";

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
  const serviceTypes =
    serviceData?.getService?.map((service) => service.type) || [];

  const renderAirportOptions = (airports) => {
    return airports.map((airport) => ({
      value: airport.iataCode,
      label: `${airport.city} - ${airport.airport} (${airport.iataCode})`,
    }));
  };

  const serviceOptions = serviceTypes.map((type) => (
    <option key={type} value={type}>
      {type}
    </option>
  ));

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
          select:focus ~ .placeholder-text,
          select:not([value='']):valid ~ .placeholder-text {
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
          select:focus ~ .placeholder-text {
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
          .form-input select,
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
            <div className="text-center mb-4">FROM</div>
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
                placeholder="Select Departure City"
              />
            </div>
            <div className="text-center mb-4">TO</div>
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
                placeholder="Select Destination Airport"
              />
            </div>
            <div className="text-center mb-4">SERVICES</div>
            <div className="form-input">
              <select
                id="service"
                name="service"
                value={form.service}
                onChange={(e) => onChangeForm("service", e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Type
                </option>
                {serviceOptions}
              </select>
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
              id="button"
              type="submit"
              className="w-full px-6 py-3 mt-4 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-purple-800 hover:bg-blue-600 hover:shadow-lg focus:outline-none"
            >
              Submit
            </button>
          </form>
          {showModal && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Success</h2>
                <p className="mt-2">
                  Your order has been received, please check your email for
                  price estimation!
                </p>
                <Link to={"/form"}>
                  <button
                    onClick={() => setShowModal(false)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Close
                  </button>
                </Link>
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
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
    marginTop: "20px",
    fontSize: "1.25rem",
    color: "#333",
  },
};

// Add this to the <style> block in the return statement of your component:
const spinnerStyle = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Add this to the <style> block in the return statement of your component:
const spinnerAnimation = `
  .spinner {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
  }
`;
