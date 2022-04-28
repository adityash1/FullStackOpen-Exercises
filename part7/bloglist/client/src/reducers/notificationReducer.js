import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    notify: (state, action) => {
      return action.payload;
    },
    // eslint-disable-next-line no-unused-vars
    mute: (state, action) => {
      return null;
    },
  },
});

export const setNotification = (notification) => {
  return async (dispatch) => {
    dispatch(notify(notification));
    setTimeout(() => {
      dispatch(mute());
    }, 5000);
  };
};

export const { notify, mute } = notificationSlice.actions;
export default notificationSlice.reducer;
