import React, { useState, useEffect } from "react"

import BlogForm from "./components/BlogForm"
import blogService from "./services/blogs"
import CreateBlog from "./components/CreateBlog"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [notification, setNotification] = useState(null)
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [user, setUser] = useState(null)

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs))
	}, [])

	const notifyWith = (message, type = "success") => {
		setNotification({ message, type })
		setTimeout(() => { }, 3000)
	}

	const createBlog = () => {
		if (user) {
			return (
				<Togglable buttonLabel='new blog'>
					<CreateBlog blogs={blogs} setBlogs={setBlogs} notifyWith={notifyWith} />
				</Togglable>
			)
		}
	}

	return (
		<div>
			{user && <h1>blogs</h1>}
			<Notification notification={notification} />
			<LoginForm
				notifyWith={notifyWith}
				user={user}
				setUser={setUser}
				username={username}
				setUsername={setUsername}
				password={password}
				setPassword={setPassword}
			/>
			{ createBlog()}
			{
				user &&
        <BlogForm blogs={blogs} setBlogs={setBlogs} />
			}
		</div>
	)
}

export default App