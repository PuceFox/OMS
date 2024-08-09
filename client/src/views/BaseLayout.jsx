import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function BaseLayout() {
  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="flex-1 p-14">
          <Outlet />
        </div>
      </div>
    </>
  );
}
