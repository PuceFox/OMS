import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="relative flex-grow bg-gradient-to-r from-blue-900 via-purple-800 to-black text-white overflow-hidden">
        <img
          src="/bg2.png" // Gambar lokal dari folder public
          className="absolute inset-0 object-cover w-full h-full filter brightness-60"
          alt="Background"
        />
        <div className="relative z-20 max-w-screen-lg mx-auto grid grid-cols-12 h-full">
          <div className="col-span-6 flex flex-col justify-center h-full pt-24 pb-12 px-6 lg:px-12">
            <span className="uppercase text-purple-400 text-sm font-semibold mb-2 block tracking-widest">
              Welcome to
            </span>
            <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
              ORDERLY
            </h1>
            <p className="text-stone-300 text-lg lg:text-xl mb-8">
              Simplifying order management for a clearer sky.
            </p>
            <Link to="/login">
              <button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white uppercase py-3 px-6 text-base font-semibold rounded-full shadow-lg hover:from-purple-600 hover:to-purple-800 transition duration-300 ease-in-out transform hover:scale-105">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-900 py-12">
        <div className="max-w-screen-lg mx-auto flex flex-col items-center text-center px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
            Ready to elevate your experience?
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl mb-8">
            Connect with us to get started on your journey. Our team is here to
            help you every step of the way.
          </p>
          <Link to="/form">
            <button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white uppercase py-3 px-6 text-base font-semibold rounded-full shadow-lg hover:from-purple-600 hover:to-purple-800 transition duration-300 ease-in-out transform hover:scale-105">
              Request Order
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
