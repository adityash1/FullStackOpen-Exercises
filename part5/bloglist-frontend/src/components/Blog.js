import React, { useState } from "react"

import blogService from "../services/blogs"

const Blog = (props) => {
	const [visible, setVisible] = useState(false)
	const [blog, setBlog] = useState(props.blog)

	const hideWhenVisible = { display: visible ? "none" : "" }
	const showWhenVisible = { display: visible ? "" : "none" }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5
	}

	const handleLikeChange = () => {
		blogService.update(blog.id, {
			"title": blog.title,
			"author": blog.author,
			"url": blog.url,
			"likes": blog.likes + 1,
		})

		blogService.getBlogByID(blog.id).then(
			data => setBlog(data)
		)
	}

	return (
		<div style={blogStyle}>
			<div style={hideWhenVisible}>
				<div>
					{blog.title} <button onClick={toggleVisibility}>view</button>
				</div>
			</div>
			<div style={showWhenVisible}>
				<div>
					{blog.title} <button onClick={toggleVisibility}>hide</button>
				</div>
				<div>{blog.url}</div>
				<div>
					{blog.likes} <button onClick={handleLikeChange}>like</button>
				</div>
				<div>{blog.author}</div>
			</div>
		</div>
	)
}

export default Blog