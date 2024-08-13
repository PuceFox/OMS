import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import logo from "../assets/name.png";
export default function BaseLayout() {
  return (
    <>
      <div className="flex bg-gradient-to-r from-[#fbc2eb] to-[#a6c0fe]">
        <SideBar />
        <div className="flex-1 p-14 bg-gradient-to-r from-[#fbc2eb] to-[#a6c0fe]">
          <div className="flex mb-4">
            <img src={logo} alt="Company Logo" className="h-20 w-56" />
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
