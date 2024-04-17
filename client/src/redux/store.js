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
      const projectToUpdate = state.projects.find(
        (project) => project.project_id === project_id
      );
      if (projectToUpdate) {
        projectToUpdate.name = name;
        projectToUpdate.description = description;
      }
    },
    updateColor: (state, action) => {
      const { project_id, color } = action.payload;
      const projectToUpdate = state.projects.find(
        (project) => project.project_id === project_id
      );
      if (projectToUpdate) {
        projectToUpdate.color = color;
      }
    },
    updateStatus: (state, action) => {
      const { project_id, status } = action.payload;
      const projectToUpdate = state.projects.find(
        (project) => project.project_id === project_id
      );
      if (projectToUpdate) {
        projectToUpdate.status = status;
      }
    },
  },
});

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications = [...state.notifications, action.payload];
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter((noti) => {
        return noti.id != action.payload.id;
      });
    },
  },
});

const detailTaskSlice = createSlice({
  name: "detailtask",
  initialState: {
    isOpen: false,
    task: null,
  },
  reducers: {
    setDetailTask: (state, action) => {
      state.isOpen = action.payload.isOpen;
      state.task = action.payload.task;
    },
    setOpened: (state, action) => {
      state.isOpen = action.payload.isOpen;
    },
  },
});

const boardSlice = createSlice({
  name: "board",
  initialState: {
    boards: [],
  },
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload.boards;
    },
    addBoardRedux: (state, action) => {
      state.boards.push(action.payload.board);
    },
    updateBoardNameRedux: (state, action) => {
      const { board_id, name } = action.payload;
      const boardToUpdate = state.boards.find(
        (board) => board.board_id == board_id
      );
      if (boardToUpdate) {
        boardToUpdate.board_name = name;
      }
    },
    deleteBoardRedux: (state, action) => {
      const { board_id } = action.payload;
      state.boards = state.boards.filter((board) => board.board_id != board_id);
    },
    updateTaskRedux: (state, action) => {
      const { board_id, task } = action.payload;
      const boardIndex = state.boards.findIndex(
        (board) => board.board_id === board_id
      );

      if (boardIndex == -1) {
        return;
      }

      const taskIndex = state.boards[boardIndex].tasks.findIndex(
        (t) => t.task_id == task.task_id
      );
      if (taskIndex == -1) {
        return;
      }

      if (task.task_name !== undefined) {
        state.boards[boardIndex].tasks[taskIndex].task_name = task.task_name;
      }
      if (task.status !== undefined) {
        state.boards[boardIndex].tasks[taskIndex].status = task.status;
      }
      if (task.end_date !== undefined) {
        state.boards[boardIndex].tasks[taskIndex].end_date = task.end_date;
      }
      if (task.start_date !== undefined) {
        state.boards[boardIndex].tasks[taskIndex].start_date = task.start_date;
      }
    },
  },
});

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    project: projectSlice.reducer,
    notification: notificationSlice.reducer,
    detailtask: detailTaskSlice.reducer,
    board: boardSlice.reducer,
  },
});

export const { setUser } = userSlice.actions;
export const { setProjects, updateColor, updateInfo, updateStatus } =
  projectSlice.actions;
export const { addNotification, removeNotification } =
  notificationSlice.actions;
export const { setDetailTask, setOpened } = detailTaskSlice.actions;
export const {
  setBoards,
  addBoardRedux,
  deleteBoardRedux,
  updateBoardNameRedux,
  updateTaskRedux,
} = boardSlice.actions;
export default store;
