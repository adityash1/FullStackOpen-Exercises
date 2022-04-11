import React, { useState } from "react"

import blogService from "../services/blogs"

const CreateBlog = props => {
	const { blogs, setBlogs, notifyWith } = props

	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")
	const [url, setUrl] = useState("")

	const addBlog = (event) => {
		event.preventDefault()

		const blogObject = {
			"title": title,
			"author": author,
			"url": url
		}

		blogService.create(blogObject).then(returnedBlog =>
			setBlogs(blogs.concat(returnedBlog))
		)

		notifyWith(`a new blog ${title} by ${author}`)
		setTimeout(() => { }, 3000)
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addBlog}>
				<div>title: <input onChange={({ target }) => setTitle(target.value)} /></div>
				<div>author: <input onChange={({ target }) => setAuthor(target.value)} /></div>
				<div>url: <input onChange={({ target }) => setUrl(target.value)} /></div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default CreateBlog