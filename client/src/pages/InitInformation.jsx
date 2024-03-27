import logo from "../assets/logo2.png";
import googleLogo from "../assets/google.png";
import TextField from "../components/TextField";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {registerAccount} from '../service/accountService'

export default function () {
  let [firstName, setFirstName] = useState("");
  let [firstNameErrorMsg, setFirstNameErrorMsg] = useState("");

  let [lastName, setLastName] = useState("");
  let [lastNameErrorMsg, setLastNameErrorMsg] = useState("");

  let [password, setPassword] = useState("");
  let [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  let [confirm, setConfirm] = useState("");
  let [confirmErrorMsg, setConfirmErrorMsg] = useState("");

  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  useEffect(()=>{
    let email = queryParams.get('email')
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email))
    {
      navigate("/register")
    }
  }, location)
  let register = ()=>{

    let err = false
    
    if(password.length <= 6)
    {
      err = true
      setPasswordErrorMsg("Mật khẩu phải có trên 6 kí tự")
    }

    if(password != confirm)
    {
      err = true
      setConfirmErrorMsg("Mật khẩu xác nhận không trùng khớp")
    }
    if(err){
      return
    }

    registerAccount(queryParams.get('email'), firstName, lastName, password)
    .then(res=>{
      console.log(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
    

  }

  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center align-middle">
      <div className="w-120 h-fit bg-white rounded-3xl px-10 py-12 mt-20 flex flex-col items-center">
        <img className="w-80 mb-4" src={logo} alt="" />
        <h1 className="text-4xl font-bold mb-5">Đăng ký</h1>

        <div className="flex flex-row ">
          <TextField
            title="Họ"
            value={firstName}
            setValue={setFirstName}
            type="text"
            errorMessage={firstNameErrorMsg}
            setErrorMessage={setFirstNameErrorMsg}
            id="firstName"
          />
          <div className="h-px w-10"></div>
          <TextField
            title="Tên"
            value={lastName}
            setValue={setLastName}
            type="text"
            errorMessage={lastNameErrorMsg}
            setErrorMessage={setLastNameErrorMsg}
            id="lastName"
          />
        </div>
        
        <TextField
          id="password"
          type="password"
          title="Mật khẩu"
          errorMessage={passwordErrorMsg}
          setErrorMessage={setPasswordErrorMsg}
          value={password}
          setValue={setPassword}
        />
        <TextField
          id="confirm"
          type="password"
          title="Nhập lại mật khẩu"
          errorMessage={confirmErrorMsg}
          setErrorMessage={setConfirmErrorMsg}
          value={confirm}
          setValue={setConfirm}
        />
{
          firstName == "" || lastName == "" || password == "" || confirm =="" ?
          <button disabled className="text-2xl font-bold bg-blue-600 text-gray-200 py-3 px-7 mt-4 rounded-full mb-4 disabled:bg-blue-300 hover:text-white">Đăng ký</button>
          :
          <button onClick={e=>register()} className="text-2xl font-bold bg-blue-600 text-white py-3 px-7 mt-4 rounded-full mb-4 disabled:bg-blue-300">Đăng ký</button>
        }
        <span>
          Bạn đã có tài khoản?{" "}
          <button
            className="font-semibold underline"
            onClick={(e) => {
              navigateToLogin();
            }}
          >
            Đăng nhập ngay
          </button>
        </span>

        <div className="h-px bg-gray-400 w-full mt-4"></div>

        <div className="mt-6 border-solid border-gray-200 border-2 py-3 px-7 rounded-full flex flex-row justify-between items-center hover:border-gray-300">
          <img src={googleLogo} className="w-6 mr-2" alt="" />
          <span className="font-semibold text-xl">
            Đăng ký với tài khoản google
          </span>
        </div>
      </div>
    </div>
  );
}
