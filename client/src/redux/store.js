import { configureStore, createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    user_id: null,
    email: null,
    firstname: null,
    lastname: null,
    avatar_url: null,
    color: -1,
  },
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
  },
  reducers: {
    
    setProjects: (state, action) => {
      state.projects = action.payload.projects;
    },
    updateInfo: (state, action) => {
      const { project_id, name, description } = action.payload;
      const projectToUpdate = state.projects.find(project => project.project_id === project_id);
      if (projectToUpdate) {
        projectToUpdate.name = name;
        projectToUpdate.description = description;
      }
    },
    updateColor: (state, action) => {
      const { project_id, color } = action.payload;
      const projectToUpdate = state.projects.find(project => project.project_id === project_id);
      if (projectToUpdate) {
        projectToUpdate.color = color;
      }
    },
  },
});

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    project: projectSlice.reducer,
  },
});

export const { setUser } = userSlice.actions;
export const { setProjects, updateColor, updateInfo} = projectSlice.actions;

export default store;
