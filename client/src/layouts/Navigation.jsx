import logo from "../assets/logo2.png";
import { NavLink } from "react-router-dom";
import {
  GoGraph,
  GoHomeFill,
  GoPackage,
  GoTasklist,
  GoVersions,
  GoDot,
} from "react-icons/go";
import { useEffect, useState } from "react";
import { getWorksapceOfUser } from "../service/workspaceService";
import { useDispatch, useSelector } from "react-redux";
import { setWorkspaceID } from "../redux/store";
import { getProjectOfUser } from "../service/projectService";

export default function (props) {
  let { userID } = props;
  const [workspaces, setWorkspaces] = useState([]);
  const [projects, setProjects] = useState([]);
  const [workspace_id, setWorkspace_id] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getWorksapceOfUser(userID)
      .then((result) => {
        console.log(result.data);
        setWorkspaces(result.data.workspaces);
        if (!localStorage.getItem("workspace_id")) {
          result.data.workspaces.forEach((value) => {
            if (value.default_workspace == 1) {
              setWorkspace_id(value.id);
              localStorage.setItem("workspace_id", value.id);
            }
          });
        } else {
          dispatch(setWorkspaceID(localStorage.getItem("workspace_id")));
          setWorkspace_id(localStorage.getItem("workspace_id"));
        }
        getProjectOfUser(localStorage.getItem('workspace_id'), userID)
        .then(result=>{
          setProjects(result.data.projects)
          console.log(result)
        })
        .catch(error =>{
          console.log(error)
        })

      })
      .catch((error) => {
        console.log(error);
      });
  }, [workspace_id]);

  return (
    <div className="h-full w-56 bg-white border-r-2 border-solid border-gray-300 flex items-start flex-col px-4 py-4">
      <NavLink to={`/${workspace_id}/home`} className="w-full">
        {({ isActive }) => (
          <div
            className={`flex items-center text-2xl  w-full p-2 rounded-xl  ${
              isActive ? "bg-blue-800 text-white font-semibold " : "text-black"
            }`}
          >
            <GoHomeFill className="mr-2" /> Home
          </div>
        )}
      </NavLink>

      <NavLink to={`/${workspace_id}/task`} className="w-full">
        {({ isActive }) => (
          <div
            className={`flex items-center text-2xl w-full p-2 rounded-xl   ${
              isActive ? "bg-blue-800 text-white font-semibold " : "text-black"
            }`}
          >
            <GoTasklist className="mr-2" /> Công việc
          </div>
        )}
      </NavLink>
      <NavLink to={`/${workspace_id}/report`} className="w-full">
        {({ isActive }) => (
          <div
            className={`flex items-center text-2xl w-full p-2 rounded-xl   ${
              isActive ? "bg-blue-800 text-white font-semibold " : "text-black"
            }`}
          >
            <GoGraph className="mr-2" /> Báo cáo
          </div>
        )}
      </NavLink>
      <div className="w-full h-1px bg-gray-500 my-2"></div>
      <div className="flex items-center text-2xl p-2 rounded-xl  ">
         Dự án
      </div>
      <div className="flex flex-col w-full pl-8">
        {projects.map((value) => {
          return (
            <NavLink key={value.project_id} to={`/${workspace_id}/${value.project_id}`} className="w-full">
              {({ isActive }) => (
                <div
                  className={`flex items-center text-xl w-full p-2 rounded-xl whitespace-nowrap   ${
                    isActive
                      ? "bg-gray-700 text-white font-semibold"
                      : "text-black"
                  }`}
                >
                  {value.name}
                </div>
              )}
            </NavLink>
          );
        })}
      </div>
      <div className="w-full h-1px bg-gray-500 my-2"></div>
      <div className="flex items-center text-2xl p-2 rounded-xl  ">
         Workspaces
      </div>
      <div className="flex flex-col w-full pl-8">
        {workspaces.map((value) => {
          return (
            <NavLink key={value.id} to={`/workspace/${value.id}`} className="w-full">
              {({ isActive }) => (
                <div
                  className={`flex items-center text-xl w-full p-2 rounded-xl whitespace-nowrap   ${
                    isActive
                      ? "bg-gray-700 text-white font-semibold"
                      : "text-black"
                  }`}
                >
                  {value.name}
                </div>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
