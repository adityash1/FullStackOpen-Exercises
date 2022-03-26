// eslint-disable-next-line
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const favorite = blogs.reduce((prev, current) => {
        return prev.likes > current.likes ? prev : current
    })
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const authors = blogs.map(blog => blog.author)
    const authorCount = authors.reduce((prev, current) => {
        if (prev[current] === undefined) {
            prev[current] = 1
        } else {
            prev[current] += 1
        }
        return prev
    }, {})
    const mostBlogs = Object.keys(authorCount).reduce((prev, current) => {
        return authorCount[prev] > authorCount[current] ? prev : current
    })
    return {
        author: mostBlogs,
        blogs: authorCount[mostBlogs]
    }
}

const mostLikes = (blogs) => {
    let authorWithMostLikes = {}
    blogs.forEach(blog => {
        if (blog.author in authorWithMostLikes) {
            authorWithMostLikes[blog.author] += blog.likes
        } else {
            authorWithMostLikes[blog.author] = blog.likes
        }
    })

    const maxValue = Math.max(...Object.values(authorWithMostLikes))
    const maxIndex = Object.keys(authorWithMostLikes).find(key => authorWithMostLikes[key] === maxValue)

    return {
        'author': maxIndex,
        'likes': maxValue
    }
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}