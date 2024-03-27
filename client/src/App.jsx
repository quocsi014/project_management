import { useNavigate, Routes, Route } from "react-router-dom"
import Navigation from "./layouts/Navigation.jsx"
import TopBar from "./layouts/TopBar.jsx";
import Home from "./layouts/Home.jsx";
import Task from "./layouts/Task.jsx";


function App() {
  let navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col">
      <TopBar/>
      <div className="h-full w-full flex">
        <Navigation></Navigation>
        <div>
          <Routes>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/task" element={<Task/>}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
