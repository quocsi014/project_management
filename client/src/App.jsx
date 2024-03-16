import { useNavigate } from "react-router-dom"



function App() {
  let navigate = useNavigate();

  return (
    <div className="w-full h-full">
      <h1>Day la app</h1>
      <button className="text-xl px-4  bg-gray-200" onClick={e=>{navigate('/login')}}>login</button>
    </div>
  );
}

export default App;
