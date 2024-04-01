import axios from "axios";

export const getProjectOfUser = (workspace_id, user_id) => {
  return axios.get(
    `http://localhost:8080/v1/users/${user_id}/workspaces/${workspace_id}/projects`
  );
};

export const getAProject = (workspace_id, project_id) => {
  return axios.get(
    `http://localhost:8080/v1/workspaces/${workspace_id}/projects/${project_id}`
  );
}
