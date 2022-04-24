import blogService from "../services/blogs";

const reducer = (state = null, action) => {
  switch (action.type) {
    case "USER_SET":
      blogService.setToken(null);
      if (action.user) {
        blogService.setToken(action.user.token);
      }
      return action.user;
    default:
      return state;
  }
};

const setUser = (user) => ({
  type: "USER_SET",
  user,
});

export { setUser };
export default reducer;
