export default function Form() {
  return (
    <>
      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 min-h-screen flex items-center justify-center">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            INPUT FORM
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Please fill in your details.
          </p>
          <form
            action="#"
            method="POST"
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
                    name="full-name"
                    id="full-name"
                    autoComplete="name"
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
                    id="email"
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
                    name="phone-number"
                    id="phone-number"
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
                      className="block w-full rounded-md border-0 py-3 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 focus:ring-2 focus:ring-inset focus:ring-blue-400 text-lg"
                    >
                      <option value="">Select Origin</option>
                      <option value="US">US</option>
                      <option value="CA">CA</option>
                      <option value="EU">EU</option>
                      <option value="UK">UK</option>
                      <option value="YE">YE</option>
                      <option value="MA">MA</option>
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
                      className="block w-full rounded-md border-0 py-3 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 focus:ring-2 focus:ring-inset focus:ring-blue-400 text-lg"
                    >
                      <option value="">Select Destination</option>
                      <option value="US">US</option>
                      <option value="CA">CA</option>
                      <option value="EU">EU</option>
                      <option value="UK">UK</option>
                      <option value="YE">YE</option>
                      <option value="MA">MA</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="company"
                  className="block text-lg font-semibold leading-6 text-black"
                >
                  Total Passangers
                </label>
                <div className="mt-3">
                  <input
                    type="text"
                    name="company"
                    id="company"
                    autoComplete="organization"
                    className="block w-full rounded-md border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 text-lg"
                  />
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
    </>
  );
}
