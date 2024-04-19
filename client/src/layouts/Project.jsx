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
import { getAProject } from "../service/projectService.js";
import Overview from "./project_layouts/Overview.jsx";
import Timeline from "./project_layouts/Timeline.jsx";
import Kanban from "./project_layouts/kanban/Kanban.jsx";
import ListTask from "./project_layouts/ListTask.jsx";
import Calendar from "./project_layouts/Calendar.jsx";
import ProjectReport from "./project_layouts/ProjectReport.jsx";
import ProjectNavigation from "./project_layouts/ProjectNavigation.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectProjectById } from "../redux/selector";
import AddMember from "./project_layouts/AddMember.jsx";
import { getUserOfProject } from "../service/projectService.js";
import DetailTask from "../components/DetailTask.jsx";
import { getBoardsOfProject } from "../service/boardService.js";
import { getTaskOfProject } from "../service/taskService.js";
import { setBoards } from "../redux/store.js";

export default function (props) {
  const { project_id, workspace_id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const project = useSelector(selectProjectById(project_id));
  const [members, setMembers] = useState([]);
  const dispatch  = useDispatch()

  const [addMemberOpened, setAddMemberOpened] = useState(false);

  useEffect(() => {
    getUserOfProject(workspace_id, project_id)
      .then((result) => {
        setMembers(result.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [project_id, workspace_id]);

  useEffect(() => {
    getBoardsOfProject(workspace_id, project_id)
      .then((result) => {
        const boardsArray = result.data.map((board) => {
          return { ...board, tasks: [] };
        });
        const boardsID = result.data.map((board) => board.board_id);
        getTaskOfProject(workspace_id, project_id)
          .then((result) => {
            result.data.forEach((task, index) => {
              boardsArray[boardsID.indexOf(task.board_id)]?.tasks.push(task);
            });
            // setBoards(boardsArray);
            dispatch(setBoards({boards:boardsArray}))
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [project_id]);

  // return project ? (
    return (
    <div className="w-full h-full flex flex-col overflow-hidden relative">
      {/* <AddMember
        isOpen={addMemberOpened}
        setIsOpen={setAddMemberOpened}
        members={members}
        setMembers={setMembers}
      /> */}
      {/* <ProjectNavigation
        project_id={project_id}
        workspace_id={workspace_id}
        setAddMemberOpen={setAddMemberOpened}
        members={members}
        project={project}
      ></ProjectNavigation> */}
      <div className="w-full h-full flex overflow-hidden">
        <Routes>
          <Route
            path={`/overview`}
            element={
              <Overview
                setAddMemberOpen={setAddMemberOpened}
                members={members}
                setMembers={setMembers}
                project={project}
              />
            }
          ></Route>
          <Route path={`/timeline`} element={<Timeline />}></Route>
          <Route path={`/kanban`} element={<Kanban />}></Route>
          <Route path={`/list`} element={<ListTask />}></Route>
          <Route path={`/calendar`} element={<Calendar />}></Route>
          <Route path={`/report`} element={<ProjectReport />}></Route>
        </Routes>
        <DetailTask />

      </div>
    </div>
    );
  // ) : (
  //   <div className="w-full h-full bg-white"></div>
  // );
}
