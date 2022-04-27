import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";

const userSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    set: (_, action) => {
      if (action.payload) {
        blogService.setToken(action.payload.token);
      }
      return action.payload;
    },
  },
});

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch(set(user));
  }
};

export const { set } = userSlice.actions;
export default userSlice.reducer;



// const reducer = (state = null, action) => {
//   switch (action.type) {
//     case "USER_SET":
//       blogService.setToken(null);
//       if (action.user) {
//         blogService.setToken(action.user.token);
//       }
//       return action.user;
//     default:
//       return state;
//   }
// };

// const setUser = (user) => ({
//   type: "USER_SET",
//   user,
// });

// export { setUser };
// export default reducer;
