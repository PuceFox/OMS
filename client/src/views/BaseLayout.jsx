import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function BaseLayout() {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
}
