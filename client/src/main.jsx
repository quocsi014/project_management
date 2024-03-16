import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { RouterProvider, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./pages/Login.jsx"
import Register from './pages/Register.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App/>}></Route>
        <Route path="/login" exact element={<Login/>}></Route>
        <Route path="/register" exact element={<Register/>}></Route>
      </Routes>
    </Router>
  </React.StrictMode>,
)
