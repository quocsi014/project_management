import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
  NavLink,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { getAProject } from "../service/projectService";
import {
  MdMargin,
  MdCalendarMonth,
  MdListAlt,
  MdOutlineViewTimeline,
  MdTableChart,
} from "react-icons/md";
import { LuLineChart } from "react-icons/lu";
import Overview from "./project_layouts/Overview.jsx";
import Timeline from "./project_layouts/Timeline.jsx";
import Kanban from "./project_layouts/Kanban.jsx";
import ListTask from "./project_layouts/ListTask.jsx";
import Calendar from "./project_layouts/Calendar.jsx";
import ProjectReport from "./project_layouts/ProjectReport.jsx";
import Avatar from "../components/Avatar.jsx";

export default function (props) {
  const navigate = useNavigate();
  const { project_id, workspace_id } = useParams();
  const [project, setProject] = useState(null);
  useEffect(() => {

    // getAProject(workspace_id, project_id)
    //   .then((result) => {
    //     setProject(result.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    setProject("HIHI");
  }, []);

  return project ? (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-16 border-b-2 flex items-center px-2">
        <div className="size-10 bg-green-700"></div>
        <div className="flex flex-col px-4 h-full justify-end">
          <span className="text-xl font-semibold">{project.name}</span>
          <div className="flex items-center">
            <NavLink
              to={`/${workspace_id}/${project_id}`}
              className="mr-8"
            >
              {({ isActive }) => (
                <div
                  className={`flex items-center ${
                    isActive ? "text-black font-semibold" : "text-gray-500"
                  }`}
                >
                  <MdMargin></MdMargin>Chung
                </div>
              )}
            </NavLink>

            <NavLink
              to={`/${workspace_id}/${project_id}/list`}
              className="mr-8"
            >
              {({ isActive }) => (
                <div
                  className={`flex items-center ${
                    isActive ? "text-black font-semibold" : "text-gray-500"
                  }`}
                >
                  <MdListAlt></MdListAlt>Danh sách
                </div>
              )}
            </NavLink>

            <NavLink
              to={`/${workspace_id}/${project_id}/kanban`}
              className="mr-8"
            >
              {({ isActive }) => (
                <div
                  className={`flex items-center ${
                    isActive ? "text-black font-semibold" : "text-gray-500"
                  }`}
                >
                  <MdTableChart></MdTableChart>Bảng
                </div>
              )}
            </NavLink>

            <NavLink
              to={`/${workspace_id}/${project_id}/timeline`}
              className="mr-8"
            >
              {({ isActive }) => (
                <div
                  className={`flex items-center ${
                    isActive ? "text-black font-semibold" : "text-gray-500"
                  }`}
                >
                  <MdOutlineViewTimeline></MdOutlineViewTimeline>Timeline
                </div>
              )}
            </NavLink>

            <NavLink
              to={`/${workspace_id}/${project_id}/calendar`}
              className="mr-8"
            >
              {({ isActive }) => (
                <div
                  className={`flex items-center ${
                    isActive ? "text-black font-semibold" : "text-gray-500"
                  }`}
                >
                  <MdCalendarMonth></MdCalendarMonth>Lịch
                </div>
              )}
            </NavLink>

            <NavLink
              to={`/${workspace_id}/${project_id}/report`}
              className="mr-8"
            >
              {({ isActive }) => (
                <div
                  className={`flex items-center ${
                    isActive ? "text-black font-semibold" : "text-gray-500"
                  }`}
                >
                  <LuLineChart></LuLineChart>Thống kê
                </div>
              )}
            </NavLink>
          </div>
        </div>
        <Avatar size="size-8" imgUrl="https://imgs.search.brave.com/L0AivBQvFslxOECbGrJM_OxNhaPDlJ06CWE0VHOPEgs/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2JjLzk5/L2VkL2JjOTllZDFk/Mzc2ZGRiNjY0MjNl/ZGQ4ZGU4ZWVjNzk5/LmpwZw" />
      </div>
      <div className="w-full h-full">
        <Routes>
          <Route
            path="/"
            element={<Overview />}
          ></Route>
          <Route
            path="/timeline"
            element={<Timeline />}
          ></Route>
          <Route
            path="/kanban"
            element={<Kanban />}
          ></Route>
          <Route
            path="/list"
            element={<ListTask />}
          ></Route>
          <Route
            path="/calendar"
            element={<Calendar />}
          ></Route>
          <Route
            path="/report"
            element={<ProjectReport />}
          ></Route>
        </Routes>

      </div>
    </div>
  ) : (
    <div className="w-full h-full bg-white"></div>
  );
}
