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

export const setNotification =
  (message, timeout = 5) =>
  (dispatch) => {
    timeout = timeout * 1000;
    dispatch(notify(message));
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      dispatch(mute());
    }, timeout);
  };

export const { notify, mute } = notificationSlice.actions;
export default notificationSlice.reducer;
