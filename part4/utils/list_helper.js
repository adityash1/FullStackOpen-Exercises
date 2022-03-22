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
    if (blogs.length === 0) {
        return {}
    } else {
        let likesCounts = blogs.reduce((likesCount, blog) => {
            likesCount[blog.author] = (likesCount[blog.author] || 0) + blog.likes
            return likesCount
        }, {})
        let maxCount = Math.max(...Object.values(likesCounts))
        let mostLiked = Object.keys(likesCounts).filter(author => likesCounts[author] === maxCount)
        return {
            author: mostLiked[0],
            likes: maxCount
        }
    }
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}