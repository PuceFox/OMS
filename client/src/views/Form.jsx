import { useMutation, useQuery } from "@apollo/client";
import { GET_AIRPORTS, GET_SERVICES, MUTATION_ADD_ORDER } from "../queries";
import { useState } from "react";

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

  if (airportLoading || serviceLoading) return <p>Loading...</p>;
  if (airportError || serviceError)
    return <p>Error! {airportError?.message || serviceError?.message}</p>;

  const airports = airportData?.getAirport || [];
  const serviceTypes =
    serviceData?.getService?.map((service) => service.type) || [];

  const renderAirportOptions = (airports) => {
    return airports.map((airport) => (
      <option key={airport.iataCode} value={airport.iataCode}>
        {airport.city} - {airport.airport} ({airport.iataCode})
      </option>
    ));
  };

  const renderServiceOptions = (serviceTypes) => {
    return serviceTypes.map((type, index) => (
      <option key={index} value={type}>
        {type}
      </option>
    ));
  };

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    origin: "",
    destination: "",
    service: "",
    pax: 0,
  });

  const [addOrder, {}] = useMutation(MUTATION_ADD_ORDER, {
    onCompleted: (res) => {
      setForm({
        fullname: "",
        email: "",
        phoneNumber: "",
        origin: "",
        destination: "",
        service: "",
        pax: 0,
      });
    },
  });

  const onChangeForm = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
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
            pax: form.pax,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 min-h-screen flex items-center justify-center">
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          INPUT FORM
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Please fill in your details.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 max-w-xl space-y-6"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="full-name"
                className="block text-lg font-semibold leading-6 text-black"
              >
                Full Name
              </label>
              <div className="mt-3">
                <input
                  type="text"
                  name="fullname"
                  value={form.fullname}
                  autoComplete="name"
                  onChange={(e) => onChangeForm("fullname", e.target.value)}
                  className="block w-full rounded-md border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 text-lg"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-lg font-semibold leading-6 text-black"
              >
                Email
              </label>
              <div className="mt-3">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(e) => onChangeForm("email", e.target.value)}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 text-lg"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="phone-number"
                className="block text-lg font-semibold leading-6 text-black"
              >
                Phone Number
              </label>
              <div className="mt-3">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={(e) => onChangeForm("phoneNumber", e.target.value)}
                  autoComplete="tel"
                  className="block w-full rounded-md border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 text-lg"
                />
              </div>
            </div>
            <div className="flex gap-x-8 sm:col-span-2">
              <div className="flex-1">
                <label
                  htmlFor="origin"
                  className="block text-lg font-semibold leading-6 text-black"
                >
                  Origin
                </label>
                <div className="relative mt-3">
                  <select
                    id="origin"
                    name="origin"
                    value={form.origin}
                    onChange={(e) => onChangeForm("origin", e.target.value)}
                    className="block w-full rounded-md border-0 py-3 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 focus:ring-2 focus:ring-inset focus:ring-blue-400 text-lg"
                  >
                    <option value="">Select Origin</option>
                    {renderAirportOptions(airports)}
                  </select>
                </div>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="destination"
                  className="block text-lg font-semibold leading-6 text-black"
                >
                  Destination
                </label>
                <div className="relative mt-3">
                  <select
                    id="destination"
                    name="destination"
                    value={form.destination}
                    onChange={(e) =>
                      onChangeForm("destination", e.target.value)
                    }
                    autoComplete="tel"
                    className="block w-full rounded-md border-0 py-3 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 focus:ring-2 focus:ring-inset focus:ring-blue-400 text-lg"
                  >
                    <option value="">Select Destination</option>
                    {renderAirportOptions(airports)}
                  </select>
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="company"
                className="block text-lg font-semibold leading-6 text-black"
              >
                Total Passengers
              </label>
              <div className="mt-3">
                <input
                  type="text"
                  name="pax"
                  value={form.pax}
                  onChange={(e) => onChangeForm("pax", Number(e.target.value))}
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 text-lg"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="service"
                className="block text-lg font-semibold leading-6 text-black"
              >
                Service
              </label>
              <div className="relative mt-3">
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={(e) => onChangeForm("service", e.target.value)}
                  className="block w-full rounded-md border-0 py-3 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 focus:ring-2 focus:ring-inset focus:ring-blue-400 text-lg"
                >
                  <option value="">Select Service</option>
                  {renderServiceOptions(serviceTypes)}
                </select>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="block w-full rounded-md bg-cyan-600 px-4 py-3 text-center text-lg font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
