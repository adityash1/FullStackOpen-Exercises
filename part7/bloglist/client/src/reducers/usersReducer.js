import { createSlice } from "@reduxjs/toolkit";

import userService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    initialize: (state, action) => {
        return action.payload;
    },
  },
});

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(initialize(users));
  };
};

export const { initialize } = usersSlice.actions;
export default usersSlice.reducer;
