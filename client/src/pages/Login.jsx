import logo from "../assets/logo2.png";
import TextField from "../components/TextField";
import googleLogo from "../assets/google.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../service/accountService";
import Loading from "../components/Loading";

export default function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [emailErrorMsg, setEmailErrorMsg] = useState("");
  let [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  let [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate();

  let handleLogin = () => {
    setIsLoading(true)
    login(email, password)
      .then((res) => {
        let setCookie = (name, value, days) => {
          var expires = "";
          if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
          }
          document.cookie = name + "=" + (value || "") + expires + "; path=/";
        }

        setCookie("user_id", res.data.account.user_id, 30)
        setCookie("token", res.data.token, 30)

      })
      .catch((err) => {
        if (err.response.status == 401) {
          setEmailErrorMsg("Email hoặc mật khẩu không chính xác");
          setPasswordErrorMsg("Email hoặc mật khẩu không chính xác");
        } else {
        }
      })
      .finally(()=>{
        setIsLoading(false)
      });
  };

  let navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center align-middle">
      {
        isLoading?
        <Loading/>
        :
        <></>
      }
      <div className="w-120 h-fit bg-white rounded-3xl px-10 py-12 mt-20 flex flex-col items-center">
        <img className="w-80 mb-4" src={logo} alt="" />
        <h1 className="text-4xl font-bold mb-5">Đăng nhập</h1>

        <TextField
          id="email"
          type="text"
          title="Email"
          errorMessage={emailErrorMsg}
          setErrorMessage={setEmailErrorMsg}
          value={email}
          setValue={setEmail}
        />
        <TextField
          id="password"
          type="password"
          title="Mật khẩu"
          errorMessage={passwordErrorMsg}
          setErrorMessage={setPasswordErrorMsg}
          value={password}
          setValue={setPassword}
        />

        <button className="self-start font-semibold underline">
          Quên mật khẩu
        </button>

        {email != "" && password != "" ? (
          <button
            onClick={(e) => handleLogin()}
            className="text-2xl font-bold bg-blue-600 text-gray-200 py-3 px-7 mt-4 rounded-full mb-4 disabled:bg-blue-300 hover:text-white"
          >
            Đăng nhập
          </button>
        ) : (
          <button
            onClick={(e) => handleLogin()}
            disabled
            className="text-2xl font-bold bg-blue-600 text-white py-3 px-7 mt-4 rounded-full mb-4 disabled:bg-blue-300"
          >
            Đăng nhập
          </button>
        )}
        <span>
          Bạn chưa có tài khoản?{" "}
          <button
            className="font-semibold underline"
            onClick={(e) => {
              navigateToRegister();
            }}
          >
            Đăng ký ngay
          </button>
        </span>

        <div className="h-px bg-gray-400 w-full mt-4"></div>

        <div className="mt-6 border-solid border-gray-200 border-2 py-3 px-7 rounded-full flex flex-row justify-between items-center hover:border-gray-300">
          <img src={googleLogo} className="w-6 mr-2" alt="" />
          <span className="font-semibold text-xl">
            Đăng nhập với tài khoản google
          </span>
        </div>
      </div>
    </div>
  );
}
