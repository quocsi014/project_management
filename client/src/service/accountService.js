import axios from "axios";
import Cookies from "js-cookie"


export const login = (email, password) => {
  let body = { email, password };
  return axios.post("http://localhost:8080/v1/login", body);
};

export const sendOtp = (email) => {
  return axios.post("http://localhost:8080/v1/send_mail/otp", { email: email });
};

export const verifyEmail = (email, otp) =>{
  return axios.post("http://localhost:8080/v1/verify/otp",{email: email, otp: otp})
}

export const registerAccount = (email, firstName, lastName, password) => {
  
  const token = Cookies.get('emailVerifyToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const data = {
    firstname: firstName,
    lastname: lastName,
    account: {
      email: email,
      password: password,
    },
  };
  return axios.post("http://localhost:8080/v1/register", data, config);
};
