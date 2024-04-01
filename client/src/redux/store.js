import { configureStore, createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice(
  {
    name: 'user',
    initialState: {
      user_id: null,
      workspace_id: null
    },
    reducers:{
      setUserID: (state, action)=>{
        state.user_id = action.payload.user_id
      },
      setWorkspaceID: (state, action)=>{
        state.workspace_id = action.payload.workspace_id
      } 
    }
  }
)

export const {setUserID, setWorkspaceID} = userSlice.actions

const store = configureStore({
  reducer: {
    user: userSlice.reducer
  }
})

export default store