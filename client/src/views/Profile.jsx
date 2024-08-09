import { useState } from "react";

export default function Profile() {
  const company = {
    name: "Example Company",
    address: "1234 Example St, Example City, EX 12345",
    email: "contact@example.com",
    phone: "123-456-7890",
    website: "www.example.com",
    description: "This is an example company profile description.",
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-purple-800 p-6">
        <h1 className="text-3xl font-bold text-white">Company Profile</h1>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Company Name
            </h2>
            <p className="text-gray-600">{company.name}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Address
            </h2>
            <p className="text-gray-600">{company.address}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Email</h2>
            <p className="text-gray-600">{company.email}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Phone</h2>
            <p className="text-gray-600">{company.phone}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Website
            </h2>
            <p className="text-gray-600">
              <a
                href={`https://${company.website}`}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {company.website}
              </a>
            </p>
          </div>
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Description
            </h2>
            <p className="text-gray-600">{company.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
