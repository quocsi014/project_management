import { useState } from "react";
import logo from "../assets/logo2.png";
import googleLogo from "../assets/google.png";
import TextField from "../components/TextField";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { sendOtp } from "../service/accountService";
import Loading from "../components/Loading";
export default function () {
  let [email, setEmail] = useState("");
  let [emailErrorMsg, setEmailErrorMsg] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  let navigateToLogin = () => {
    navigate("/login");
  };

  let navigateToVerify = () => {
    let err = false;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      err = true;
      setEmailErrorMsg("Email không hợp lệ");
    }

    if (err) {
      return;
    }
    setIsLoading(true)
    sendOtp(email)
      .then(() => {
        navigate("/verify?email=" + email);
      })
      .catch((error) => {
        console.log(error);
        let status = error.response.status
        if(status == 409){
          setEmailErrorMsg("Email đã được sử dụng")
          setEmail('')
        }else{
          navigate('/internalservererror')
        }
      })
      .finally(()=>{
        setIsLoading(false)
      });
  };

  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center">
      {
        isLoading?
        <Loading/>
        :
        <></>
      }
      <div className="w-120 h-fit bg-white rounded-3xl px-10 py-12 mt-32 flex flex-col items-center">
        <img className="w-80 mb-4" src={logo} alt="" />
        <h1 className="text-4xl font-bold mb-5">Đăng ký</h1>
    
        <TextField
          id="email"
          type="text"
          title="Email"
          errorMessage={emailErrorMsg}
          setErrorMessage={setEmailErrorMsg}
          value={email}
          setValue={setEmail}
        />
        
        {email == "" ? (
          <button
            onClick={(e) => navigateToVerify()}
            disabled
            className="w-full flex justify-center text-2xl font-bold bg-blue-600 text-white py-3 rounded-md mb-4 disabled:bg-blue-300"
          >
            <FaArrowRight />
          </button>
        ) : (
          <button
            onClick={(e) => {
              navigateToVerify();
            }}
            className="w-full flex justify-center text-2xl font-bold bg-blue-600 text-gray-200 py-3 rounded-md mb-4 hover:text-white"
          >
            <FaArrowRight />
          </button>
        )}
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
