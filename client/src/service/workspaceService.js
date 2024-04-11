import axios from "axios"

export const getWorksapceOfUser = (userID) => {
  return axios.get(`http://localhost:8080/v1/users/${userID}/workspaces`)
}

export const getUserOfWorkspace = (workspace_id)=>{
  return axios.get(`http://localhost:8080/v1/workspaces/${workspace_id}/members`)
}