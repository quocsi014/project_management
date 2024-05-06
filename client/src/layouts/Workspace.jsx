
import {
  Routes,
  Route,
  useParams
} from "react-router-dom";

import NavigationWorkspace from "./workspace_layout/NavigationWorkspace";
import OverviewWorkspace from "./workspace_layout/OverviewWorkspace";
import MembersWorkspace from "./workspace_layout/MembersWorkspace";
import AdminWorkspace from "./workspace_layout/AdminWorkspace";
export default function () {
  const { workspace_id } = useParams();


  return (
    <div className="w-full h-full px-6 flex flex-col overflow-hidden relative">
      <NavigationWorkspace workspace_id={workspace_id} />
      <div className="w-full h-auto flex overflow-y-auto mb-5" >
        <Routes>
          <Route path="/overview" element={<OverviewWorkspace/>} />
          <Route path="/members" element={<MembersWorkspace/>} />
          <Route path="/admin" element={<AdminWorkspace/>} />
        </Routes>
      </div>
    </div>
  )
}