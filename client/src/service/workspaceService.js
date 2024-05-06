import axios from "axios"

export const getWorksapceOfUser = (userID) => {
  return axios.get(`http://localhost:8080/v1/users/${userID}/workspaces`)
}

export const getUserOfWorkspace = (workspace_id)=>{
  return axios.get(`http://localhost:8080/v1/workspaces/${workspace_id}/collaborators`)
}

export const getUserOfWorkspaceAndInvitation = (workspace_id)=>{
  return axios.get(`http://localhost:8080/v1/workspaces/${workspace_id}/collaborators/invitations`)
}

export const deleteUserOfWorkspace= (workspace_id, collaborators_id)=>{
  return axios.delete(`http://localhost:8080/v1/workspaces/${workspace_id}/collaborators/${collaborators_id}`)
}

export const deleteInvitationOfWorkspace= (workspace_id, collaborators_id)=>{
  return axios.delete(`http://localhost:8080/v1/workspaces/${workspace_id}/collaborators/${collaborators_id}/invitation`)
}