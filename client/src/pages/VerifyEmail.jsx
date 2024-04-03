import logo from "../assets/logo2.png";
import googleLogo from "../assets/google.png";
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendOtp, verifyEmail } from "../service/accountService";
import Cookie from "js-cookie";
import Loading from "../components/Loading";

export default function () {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(120);
  const [isLoading, setIsLoading] = useState(false);
  const [otpErrorMsg, setOtpErrorMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let inputRefs = useRef([]);

  useEffect(() => {
    if (timer == 0) {
      return;
    }

    const iterval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => clearInterval(iterval);
  }, [timer]);

  useEffect(() => {
    let email = queryParams.get("email");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      navigate("/register");
    }
  }, []);

  let inputChange = (e, index) => {
    if (
      (isNaN(e.target.value) || otp[index].length >= 1) &&
      e.target.value != ""
    ) {
      return;
    }
    setTimer(10);
    let newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    if (index < 3 && e.target.value != "") {
      inputRefs.current[index + 1].focus();
    }
  };

  let handleKeyDown = (e, index) => {
    if (index > 0 && e.key == "Backspace" && otp[index] == "") {
      inputRefs.current[index - 1].focus();
    }
  };

  let handleReSend = () => {
    setIsLoading(true)
    sendOtp(queryParams.get('email'))
    .then(result =>{

    })
    .catch(error=>{
      navigate("/internalservererror")
    })
    .finally(()=>{
      setIsLoading(false)
    })
    setTimer(120);
  };

  let navigateToInit = () => {
    setIsLoading(true);
    let otpNum = parseInt(otp.join(""));
    verifyEmail(queryParams.get("email"), otpNum)
      .then((res) => {
        let token = res.data.token;
        Cookie.set("emailVerifyToken", token, 30);
        navigate(`/initinformation?user=${queryParams.get("email")}`);
      })
      .catch((err) => {
        if (err.response.status != 500) {
          setOtpErrorMsg("Otp không chính xác hoặc đã hết hạn");
        } else {
          navigate("/internalservererror")
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  let navigateToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center">
      {isLoading ? <Loading /> : <></>}
      <div className="w-120 h-fit bg-white rounded-3xl px-10 py-12 mt-32 flex flex-col items-center">
        <img className="w-80 mb-4" src={logo} alt="" />
        <h1 className="text-4xl font-bold mb-5">Xác nhận email</h1>
        <span>Nhập OTP được gửi đến email của bạn</span>
        <span>
          Bạn chưa nhận được mã?{" "}
          {timer == 0 ? (
            <button className="font-semibold" onClick={(e) => handleReSend()}>
              gửi lại
            </button>
          ) : (
            <button className="text-gray-500" disabled>
              gửi lại
            </button>
          )}{" "}
          (0{Math.floor(timer / 60)}:
          {timer % 60 < 10 ? "0" + (timer % 60) : timer % 60})
        </span>
        <div className="flex w-fit my-4">
          {otp.map((elm, index) => {
            return (
              <input
                value={elm}
                onChange={(e) => inputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(input) => (inputRefs.current[index] = input)}
                className={`h-16 w-12 bg-gray-100 focus:border-2 border-0 outline-none rounded-md text-5xl text-center text-gray-500 border-gray-300 border-solid ${
                  index < 3 ? "mr-4" : "mr-0"
                }`}
                type="text"
              />
            );
          })}
        </div>
        <span className="text-red-500">{otpErrorMsg}</span>
        {otp[1] == "" || otp[2] == "" || otp[3] == "" || otp[4] == "" ? (
          <button
            onClick={(e) => navigateToVerify()}
            disabled
            className="w-60 flex justify-center text-2xl font-bold bg-blue-600 text-white py-3 rounded-md mb-4 disabled:bg-blue-300"
          >
            <FaArrowRight />
          </button>
        ) : (
          <button
            onClick={(e) => {
              navigateToInit();
            }}
            className="w-60 flex justify-center text-2xl font-bold bg-blue-600 text-gray-200 py-3 rounded-md mb-4 hover:text-white"
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
