import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs: (state, action) => {
            return action.payload;
        },
        appendBlog: (state, action) => {
            return [...state, action.payload];
        }
    }
})

export const initializeBlogs = () => {
    return async dispatch => {
      const blogs = await blogService.getAll()
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      dispatch(setBlogs(sortedBlogs))
    }
  }

  export const createBlog = content => {
    return async dispatch => {
      const newBlog = await blogService.create(content)
      dispatch(appendBlog(newBlog))
    }
  }

export const { setBlogs, appendBlog } = blogSlice.actions
export default blogSlice.reducer;
