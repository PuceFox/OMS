import { Link } from "react-router-dom";

export default function Profile() {
  const company = {
    name: "SkyEvac",
    address: "Taman Buah 1 Blok C3 No.1, Kutabumi, Pasar Kemis - Kab. Tangerang, Indonesia. 15564",
    email: "contact@skyevac.id",
    phone: "+62-819-5000-620",
    website: "https://www.skyevac.ac.id",
    description:
      "SkyEvac is the ultimate solution for air travel and business needs. With our team of experienced professionals and state-of-the-art facilities, we provide the most reliable and seamless solutions for your air travel requirements.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#fbc2eb] to-[#a6c0fe] p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-purple-800 p-8">
          <h1 className="text-4xl font-bold text-white text-center">Company Profile</h1>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Company Name</h2>
              <p className="text-gray-600 text-lg">{company.name}</p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Address</h2>
              <p className="text-gray-600 text-lg">{company.address}</p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Email</h2>
              <p className="text-gray-600 text-lg">{company.email}</p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Phone</h2>
              <p className="text-gray-600 text-lg">{company.phone}</p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Website</h2>
              <p className="text-gray-600 text-lg">
                <Link to={company.website} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                  {company.website}
                </Link>
              </p>
            </div>
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Description</h2>
              <p className="text-gray-600 text-lg">{company.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
