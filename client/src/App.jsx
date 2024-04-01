import { useNavigate, Routes, Route } from "react-router-dom"
import Navigation from "./layouts/Navigation.jsx"
import TopBar from "./layouts/TopBar.jsx";
import Home from "./layouts/Home.jsx";
import Task from "./layouts/Task.jsx";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Workspace from "./layouts/Workspace.jsx";
import Report from "./layouts/Report.jsx";
import Project from "./layouts/Project.jsx";
import Kanban from "./layouts/project_layouts/Kanban.jsx";

function App() {
  let navigate = useNavigate();
  let [userID, setUserID] = useState(Cookies.get("user_id"))
  let [token, setToken] = useState(Cookies.get("token"))
  useEffect(()=>{
    if(userID == "" || token == ""){
      navigate("/login")
    }
  },[])
  return (
    <div className="w-screen h-screen flex flex-col">
      <TopBar/>
      <div className="h-full w-full flex">
        <Navigation userID={userID}></Navigation>
        <div className="w-full h-full">
          <Routes>
            <Route path="/:workspace_id/home" exact element={<Kanban/>}></Route>
            <Route path="/:workspace_id/task" element={<Task/>}></Route>
            <Route path="/:workspace_id/report" element={<Report/>}></Route>
            <Route path="/:workspace_id/:project_id/*" element={<Project/>}></Route>
            <Route path="/workspace/:workspace_id" element={<Workspace/>}></Route>

          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
