import axios from "axios"

export const getUserInformation = (user_id)=>{
  return axios.get(`http://localhost:8080/v1/users/${user_id}`)
}