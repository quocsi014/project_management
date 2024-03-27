import logo from "../assets/logo2.png";
import { NavLink } from "react-router-dom";
import { GoGraph, GoHomeFill, GoPackage, GoTasklist, GoVersions } from "react-icons/go";
import { FaChartPie, FaLayerGroup, FaProjectDiagram, FaTasks } from "react-icons/fa";

export default function () {
  return (
    <div className="h-full w-56 bg-white border-r-2 border-solid border-gray-300 flex items-start flex-col px-4 py-4">
      <NavLink to="/home" className="w-full">
        {({ isActive }) => (
          <div
            className={`flex items-center text-2xl  w-full p-2 rounded-xl  ${
              isActive ? "bg-blue-800 text-white" : "text-black"
            }`}
          >
            <GoHomeFill className="mr-2" /> Home
          </div>
        )}
      </NavLink>

      <NavLink to="/task" className="w-full">
        {({ isActive }) => (
          <div
            className={`flex items-center text-2xl w-full p-2 rounded-xl   ${
              isActive ? "bg-blue-800 text-white" : "text-black"
            }`}
          >
            <GoTasklist className="mr-2" /> Công việc
          </div>
        )}
      </NavLink>
      <NavLink to="report" className="w-full">
        {({ isActive }) => (
          <div
            className={`flex items-center text-2xl w-full p-2 rounded-xl   ${
              isActive ? "bg-blue-800 text-white" : "text-black"
            }`}
          >
            <GoGraph className="mr-2" /> Báo cáo
          </div>
        )}
      </NavLink>
      <div
        className="flex items-center text-2xl p-2 rounded-xl  "
      >
        <GoPackage className="mr-2" /> Dự án
      </div>

      <div
        className="flex items-center text-2xl p-2 rounded-xl  "
      >
        <GoVersions className="mr-2" /> Nhóm
      </div>

    </div>
  );
}
