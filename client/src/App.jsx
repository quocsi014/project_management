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
import { getUserInformation } from "./service/userService.js";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/store.js";
import Notifications from "./layouts/Notifications.jsx";

function App() {
  let navigate = useNavigate();
  let [userID, setUserID] = useState(Cookies.get("user_id"))
  let [token, setToken] = useState(Cookies.get("token"))
  const dispatch = useDispatch()

  // useEffect(()=>{
  //   if(!userID || !token){
  //     navigate("/login")
  //   }else{
  //     getUserInformation(userID)
  //     .then(result=>{
  //       dispatch(setUser(result.data))
  //     })
  //     .catch(error=>{
  //       console.log(error)  
  //     })
  //   }
  // },[])
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden relative">
      <Notifications/>
      <TopBar/>
      <div className="h-full w-full flex overflow-hidden">
        <Navigation userID={userID}></Navigation>
        <div className="w-full h-full overflow-hidden">
          <Routes>
            <Route path="/:workspace_id/home" exact element={<Home/>}></Route>
            <Route path="/:workspace_id/task" element={<Task/>}></Route>
            <Route path="/:workspace_id/report" element={<Report/>}></Route>
            <Route path="/:workspace_id/:project_id/*" element={<Project/>}></Route>
            <Route path="/workspace/:workspace_id/*" element={<Workspace/>}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
