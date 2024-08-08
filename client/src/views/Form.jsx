// // import { useMutation, useQuery } from "@apollo/client";
// // import { GET_AIRPORTS, GET_SERVICES, MUTATION_ADD_ORDER } from "../queries";
// // import { useState } from "react";

// // export default function Form() {
// //   const {
// //     data: airportData,
// //     loading: airportLoading,
// //     error: airportError,
// //   } = useQuery(GET_AIRPORTS);
// //   const {
// //     data: serviceData,
// //     loading: serviceLoading,
// //     error: serviceError,
// //   } = useQuery(GET_SERVICES);

// //   const [form, setForm] = useState({
// //     fullname: "",
// //     email: "",
// //     phoneNumber: "",
// //     origin: "",
// //     destination: "",
// //     service: "",
// //     pax: "",
// //   });

// //   const [addOrder] = useMutation(MUTATION_ADD_ORDER, {
// //     onCompleted: () => {
// //       setForm({
// //         fullname: "",
// //         email: "",
// //         phoneNumber: "",
// //         origin: "",
// //         destination: "",
// //         service: "",
// //         pax: "",
// //       });
// //     },
// //     onError: (error) => {
// //       // Handle error appropriately
// //       console.error("Mutation Error:", error);
// //     },
// //   });

// //   if (airportLoading || serviceLoading) return <p>Loading...</p>;
// //   if (airportError || serviceError)
// //     return <p>Error! {airportError?.message || serviceError?.message}</p>;

// //   const airports = airportData?.getAirport || [];
// //   const serviceTypes =
// //     serviceData?.getService?.map((service) => service.type) || [];

// //   const renderAirportOptions = (airports) => {
// //     return airports.map((airport) => (
// //       <option key={airport.iataCode} value={airport.iataCode}>
// //         {airport.city} - {airport.airport} ({airport.iataCode})
// //       </option>
// //     ));
// //   };

// //   const renderServiceOptions = (serviceTypes) => {
// //     return serviceTypes.map((type, index) => (
// //       <option key={index} value={type}>
// //         {type}
// //       </option>
// //     ));
// //   };

// //   const onChangeForm = (key, value) => {
// //     setForm((prevForm) => ({
// //       ...prevForm,
// //       [key]: value,
// //     }));
// //   };

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     try {
// //       await addOrder({
// //         variables: {
// //           input: {
// //             fullname: form.fullname,
// //             email: form.email,
// //             phoneNumber: form.phoneNumber,
// //             origin: form.origin,
// //             destination: form.destination,
// //             service: form.service,
// //             pax: parseInt(form.pax, 10), // Ensure pax is a number
// //           },
// //         },
// //       });
// //     } catch (error) {
// //       console.error("Submit Error:", error);
// //     }
// //   };

// //   return (
// //     <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 min-h-screen flex items-center justify-center">
// //       <div className="relative z-10 mx-auto max-w-2xl text-center">
// //         <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
// //           INPUT FORM
// //         </h2>
// //         <p className="mt-2 text-lg leading-8 text-gray-600">
// //           Please fill in your details.
// //         </p>
// //         <form
// //           onSubmit={handleSubmit}
// //           className="mx-auto mt-8 max-w-xl space-y-6"
// //         >
// //           <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
// //             {["fullname", "email", "phoneNumber"].map((field) => (
// //               <div key={field} className="sm:col-span-2">
// //                 <label
// //                   htmlFor={field}
// //                   className="block text-lg font-semibold leading-6 text-black"
// //                 >
// //                   {field.charAt(0).toUpperCase() +
// //                     field.slice(1).replace(/([A-Z])/g, " $1")}
// //                 </label>
// //                 <div className="mt-3">
// //                   <input
// //                     type={
// //                       field === "email"
// //                         ? "email"
// //                         : field === "phoneNumber"
// //                         ? "tel"
// //                         : "text"
// //                     }
// //                     name={field}
// //                     value={form[field]}
// //                     onChange={(e) => onChangeForm(field, e.target.value)}
// //                     autoComplete={field}
// //                     className="block w-full rounded-md border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 text-lg"
// //                   />
// //                 </div>
// //               </div>
// //             ))}
// //             <div className="flex gap-x-8 sm:col-span-2">
// //               {["origin", "destination"].map((field) => (
// //                 <div key={field} className="flex-1">
// //                   <label
// //                     htmlFor={field}
// //                     className="block text-lg font-semibold leading-6 text-black"
// //                   >
// //                     {field.charAt(0).toUpperCase() + field.slice(1)}
// //                   </label>
// //                   <div className="relative mt-3">
// //                     <select
// //                       id={field}
// //                       name={field}
// //                       value={form[field]}
// //                       onChange={(e) => onChangeForm(field, e.target.value)}
// //                       className="block w-full rounded-md border-0 py-3 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 focus:ring-2 focus:ring-inset focus:ring-blue-400 text-lg"
// //                     >
// //                       <option value="">
// //                         Select {field.charAt(0).toUpperCase() + field.slice(1)}
// //                       </option>
// //                       {renderAirportOptions(airports)}
// //                     </select>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //             <div className="sm:col-span-2">
// //               <label
// //                 htmlFor="pax"
// //                 className="block text-lg font-semibold leading-6 text-black"
// //               >
// //                 Total Passengers
// //               </label>
// //               <div className="mt-3">
// //                 <input
// //                   type="number"
// //                   name="pax"
// //                   value={form.pax}
// //                   onChange={(e) => onChangeForm("pax", e.target.value)}
// //                   autoComplete="pax"
// //                   className="block w-full rounded-md border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 text-lg"
// //                 />
// //               </div>
// //             </div>
// //             <div className="sm:col-span-2">
// //               <label
// //                 htmlFor="service"
// //                 className="block text-lg font-semibold leading-6 text-black"
// //               >
// //                 Service
// //               </label>
// //               <div className="relative mt-3">
// //                 <select
// //                   id="service"
// //                   name="service"
// //                   value={form.service}
// //                   onChange={(e) => onChangeForm("service", e.target.value)}
// //                   className="block w-full rounded-md border-0 py-3 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 focus:ring-2 focus:ring-inset focus:ring-blue-400 text-lg"
// //                 >
// //                   <option value="">Select Service</option>
// //                   {renderServiceOptions(serviceTypes)}
// //                 </select>
// //               </div>
// //             </div>
// //           </div>
// //           <div className="mt-8">
// //             <button
// //               type="submit"
// //               className="block w-full rounded-md bg-cyan-600 px-4 py-3 text-center text-lg font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
// //             >
// //               Submit
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// import { useMutation, useQuery } from "@apollo/client";
// import { GET_AIRPORTS, GET_SERVICES, MUTATION_ADD_ORDER } from "../queries";
// import { useState } from "react";

// export default function Form() {
//   const {
//     data: airportData,
//     loading: airportLoading,
//     error: airportError,
//   } = useQuery(GET_AIRPORTS);
//   const {
//     data: serviceData,
//     loading: serviceLoading,
//     error: serviceError,
//   } = useQuery(GET_SERVICES);

//   const [form, setForm] = useState({
//     fullname: "",
//     email: "",
//     phoneNumber: "",
//     origin: "",
//     destination: "",
//     service: "",
//     pax: "",
//   });

//   const [showModal, setShowModal] = useState(false);

//   const [addOrder] = useMutation(MUTATION_ADD_ORDER, {
//     onCompleted: () => {
//       setForm({
//         fullname: "",
//         email: "",
//         phoneNumber: "",
//         origin: "",
//         destination: "",
//         service: "",
//         pax: "",
//       });
//       setShowModal(true); // Show the modal on completion
//     },
//     onError: (error) => {
//       console.error("Mutation Error:", error);
//     },
//   });

//   if (airportLoading || serviceLoading) return <p>Loading...</p>;
//   if (airportError || serviceError)
//     return <p>Error! {airportError?.message || serviceError?.message}</p>;

//   const airports = airportData?.getAirport || [];
//   const serviceTypes =
//     serviceData?.getService?.map((service) => service.type) || [];

//   const renderAirportOptions = (airports) => {
//     return airports.map((airport) => (
//       <option key={airport.iataCode} value={airport.iataCode}>
//         {airport.city} - {airport.airport} ({airport.iataCode})
//       </option>
//     ));
//   };

//   const renderServiceOptions = (serviceTypes) => {
//     return serviceTypes.map((type, index) => (
//       <option key={index} value={type}>
//         {type}
//       </option>
//     ));
//   };

//   const onChangeForm = (key, value) => {
//     setForm((prevForm) => ({
//       ...prevForm,
//       [key]: value,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await addOrder({
//         variables: {
//           input: {
//             fullname: form.fullname,
//             email: form.email,
//             phoneNumber: form.phoneNumber,
//             origin: form.origin,
//             destination: form.destination,
//             service: form.service,
//             pax: parseInt(form.pax, 10), // Ensure pax is a number
//           },
//         },
//       });
//     } catch (error) {
//       console.error("Submit Error:", error);
//     }
//   };

//   return (
//     <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 min-h-screen flex items-center justify-center">
//       <div className="relative z-10 mx-auto max-w-2xl text-center">
//         <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//           INPUT FORM
//         </h2>
//         <p className="mt-2 text-lg leading-8 text-gray-600">
//           Please fill in your details.
//         </p>
//         <form
//           onSubmit={handleSubmit}
//           className="mx-auto mt-8 max-w-xl space-y-6"
//         >
//           <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
//             {["fullname", "email", "phoneNumber"].map((field) => (
//               <div key={field} className="sm:col-span-2">
//                 <label
//                   htmlFor={field}
//                   className="block text-lg font-semibold leading-6 text-black"
//                 >
//                   {field.charAt(0).toUpperCase() +
//                     field.slice(1).replace(/([A-Z])/g, " $1")}
//                 </label>
//                 <div className="mt-3">
//                   <input
//                     type={
//                       field === "email"
//                         ? "email"
//                         : field === "phoneNumber"
//                         ? "tel"
//                         : "text"
//                     }
//                     name={field}
//                     value={form[field]}
//                     onChange={(e) => onChangeForm(field, e.target.value)}
//                     autoComplete={field}
//                     className="block w-full rounded-md border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 text-lg"
//                   />
//                 </div>
//               </div>
//             ))}
//             <div className="flex gap-x-8 sm:col-span-2">
//               {["origin", "destination"].map((field) => (
//                 <div key={field} className="flex-1">
//                   <label
//                     htmlFor={field}
//                     className="block text-lg font-semibold leading-6 text-black"
//                   >
//                     {field.charAt(0).toUpperCase() + field.slice(1)}
//                   </label>
//                   <div className="relative mt-3">
//                     <select
//                       id={field}
//                       name={field}
//                       value={form[field]}
//                       onChange={(e) => onChangeForm(field, e.target.value)}
//                       className="block w-full rounded-md border-0 py-3 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 focus:ring-2 focus:ring-inset focus:ring-blue-400 text-lg"
//                     >
//                       <option value="">
//                         Select {field.charAt(0).toUpperCase() + field.slice(1)}
//                       </option>
//                       {renderAirportOptions(airports)}
//                     </select>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="sm:col-span-2">
//               <label
//                 htmlFor="pax"
//                 className="block text-lg font-semibold leading-6 text-black"
//               >
//                 Total Passengers
//               </label>
//               <div className="mt-3">
//                 <input
//                   type="number"
//                   name="pax"
//                   value={form.pax}
//                   onChange={(e) => onChangeForm("pax", e.target.value)}
//                   autoComplete="pax"
//                   className="block w-full rounded-md border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 text-lg"
//                 />
//               </div>
//             </div>
//             <div className="sm:col-span-2">
//               <label
//                 htmlFor="service"
//                 className="block text-lg font-semibold leading-6 text-black"
//               >
//                 Service
//               </label>
//               <div className="relative mt-3">
//                 <select
//                   id="service"
//                   name="service"
//                   value={form.service}
//                   onChange={(e) => onChangeForm("service", e.target.value)}
//                   className="block w-full rounded-md border-0 py-3 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 focus:ring-2 focus:ring-inset focus:ring-blue-400 text-lg"
//                 >
//                   <option value="">Select Service</option>
//                   {renderServiceOptions(serviceTypes)}
//                 </select>
//               </div>
//             </div>
//           </div>
//           <div className="mt-8">
//             <button
//               type="submit"
//               className="block w-full rounded-md bg-cyan-600 px-4 py-3 text-center text-lg font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//             >
//               Submit
//             </button>
//           </div>
//         </form>

//         {/* Modal HTML */}
//         {showModal && (
//           <div
//             className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50"
//             role="dialog"
//             aria-labelledby="modal-title"
//             aria-modal="true"
//           >
//             <div className="modal-box bg-white p-6 rounded shadow-lg">
//               <h3 id="modal-title" className="text-lg font-bold">
//                 Submission Successful!
//               </h3>
//               <p className="py-4">Your form has been submitted successfully.</p>
//               <div className="modal-action flex justify-end gap-4">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => setShowModal(false)}
//                 >
//                   OK
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useMutation, useQuery } from "@apollo/client";
import { GET_AIRPORTS, GET_SERVICES, MUTATION_ADD_ORDER } from "../queries";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Form() {
  const { data: airportData, loading: airportLoading, error: airportError } = useQuery(GET_AIRPORTS);
  const { data: serviceData, loading: serviceLoading, error: serviceError } = useQuery(GET_SERVICES);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    origin: "",
    destination: "",
    service: "",
    pax: "",
  });

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
      setShowModal(true); // Show the modal on completion
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
    },
  });

  if (airportLoading || serviceLoading) return <p>Loading...</p>;
  if (airportError || serviceError) return <p>Error! {airportError?.message || serviceError?.message}</p>;

  const airports = airportData?.getAirport || [];
  const serviceTypes = serviceData?.getService?.map((service) => service.type) || [];

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
            pax: parseInt(form.pax, 10), // Ensure pax is a number
          },
        },
      });
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 min-h-screen flex items-center justify-center">
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">INPUT FORM</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">Please fill in your details.</p>
        <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-xl space-y-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {["fullname", "email", "phoneNumber"].map((field) => (
              <div key={field} className="sm:col-span-2">
                <label htmlFor={field} className="block text-lg font-semibold leading-6 text-black">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
                </label>
                <div className="mt-3">
                  <input
                    type={field === "email" ? "email" : field === "phoneNumber" ? "tel" : "text"}
                    name={field}
                    value={form[field]}
                    onChange={(e) => onChangeForm(field, e.target.value)}
                    autoComplete={field}
                    className="block w-full rounded-md border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 text-lg"
                  />
                </div>
              </div>
            ))}
            <div className="flex gap-x-8 sm:col-span-2">
              {["origin", "destination"].map((field) => (
                <div key={field} className="flex-1">
                  <label htmlFor={field} className="block text-lg font-semibold leading-6 text-black">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <div className="relative mt-3">
                    <select
                      id={field}
                      name={field}
                      value={form[field]}
                      onChange={(e) => onChangeForm(field, e.target.value)}
                      className="block w-full rounded-md border-0 py-3 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 focus:ring-2 focus:ring-inset focus:ring-blue-400 text-lg"
                    >
                      <option value="">Select {field.charAt(0).toUpperCase() + field.slice(1)}</option>
                      {renderAirportOptions(airports)}
                    </select>
                  </div>
                </div>
              ))}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="pax" className="block text-lg font-semibold leading-6 text-black">
                Total Passengers
              </label>
              <div className="mt-3">
                <input
                  type="number"
                  name="pax"
                  value={form.pax}
                  onChange={(e) => onChangeForm("pax", e.target.value)}
                  autoComplete="pax"
                  className="block w-full rounded-md border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 text-lg"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="service" className="block text-lg font-semibold leading-6 text-black">
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

        {/* Modal HTML */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 transition-opacity" role="dialog" aria-labelledby="modal-title" aria-modal="true">
            <div className="relative bg-white rounded-lg shadow-lg max-w-sm mx-4 sm:mx-8 p-6 overflow-hidden">
              <h3 id="modal-title" className="text-2xl font-bold text-gray-900 mb-4">
                Submission Successful!
              </h3>
              <p className="text-gray-700 mb-6">Your order has been received. Thank you!</p>
              <div className="flex justify-end">
                <Link to={"/form"}>
                  <button className="bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700 transition-colors" onClick={() => setShowModal(false)}>
                    OK
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
