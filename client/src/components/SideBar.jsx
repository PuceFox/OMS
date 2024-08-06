import { useState } from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  return (
    <>
      <div className={`flex flex-col h-screen p-3 bg-purple-800  shadow ${isOpen ? "w-60" : "w-16"} transition-width duration-300`}>
        <button className="text-white focus:outline-none mb-4" onClick={toggleSidebar}>
          ☰
        </button>
        <div className="space-y-3">
          <div className="flex items-center justify-center">
            <h2 className={`text-xl font-bold text-white ${isOpen ? "block" : "hidden"}`}>MyApp</h2>
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="rounded-sm">
                <Link to="/dashboard" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700 text-white">
                  <span className={`${isOpen ? "block" : "hidden"}`}>Dashboard</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link to="/profile" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700 text-white">
                  <span className={`${isOpen ? "block" : "hidden"}`}>Profile</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <a href="#" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700 text-white">
                  <span className={`${isOpen ? "block" : "hidden"}`}>Settings</span>
                </a>
              </li>
              <li className="rounded-sm">
                <a href="#" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700 text-white">
                  <span className={`${isOpen ? "block" : "hidden"}`}>Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
