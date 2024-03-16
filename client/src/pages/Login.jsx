import logo from "../assets/logo2.png";
import TextField from "../components/TextField";
import googleLogo from "../assets/google.png"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(){

  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [emailErrorMsg, setEmailErrorMsg] = useState("")
  let [passwordErrorMsg, setPasswordErrorMsg] = useState("")

  let navigate = useNavigate();


  let handleLogin = ()=>{
    console.log({email, password})
  }

  let navigateToRegister = ()=>{
    navigate("/register")
  }

  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center align-middle">
      <div className="w-120 h-fit bg-white rounded-3xl px-10 py-12 mt-20 flex flex-col items-center">

        <img className="w-80 mb-4" src={logo} alt="" />
        <h1 className="text-4xl font-bold mb-5" >Đăng nhập</h1>

        <TextField id="email" type="text" title="Email" errorMessage={emailErrorMsg} value={email} setValue={setEmail} />
        <TextField id="password" type="password" title="Mật khẩu" errorMessage={passwordErrorMsg} value={password} setValue={setPassword} />

        <button className="self-start font-semibold underline">Quên mật khẩu</button>

        {
          email != "" && password != ""?
          <button onClick={e=>handleLogin()} className="text-2xl font-bold bg-blue-600 text-gray-200 py-3 px-7 mt-4 rounded-full mb-4 disabled:bg-blue-300 hover:text-white">Đăng nhập</button>
          :
          <button onClick={e=>handleLogin()} disabled className="text-2xl font-bold bg-blue-600 text-white py-3 px-7 mt-4 rounded-full mb-4 disabled:bg-blue-300">Đăng nhập</button>
        }
        <span>Bạn chưa có tài khoản? <button className="font-semibold underline" onClick={e=>{navigateToRegister()}}>Đăng ký ngay</button></span>

        <div className="h-px bg-gray-400 w-full mt-4"></div>

        <div className="mt-6 border-solid border-gray-200 border-2 py-3 px-7 rounded-full flex flex-row justify-between items-center hover:border-gray-300">
          <img src={googleLogo} className="w-6 mr-2" alt="" />
          <span className="font-semibold text-xl">
            Đăng nhập với tài khoản google
          </span>
        </div>
      </div>
    </div>
  )
}