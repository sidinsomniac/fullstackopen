const dummy = list => 1;

const totalLikes = list => {
    const likes = list.reduce((a, b) => a + b.likes, 0);
    return likes;
};

const favouriteBlog = list => {
    let mostLikes = 0, mostLikedBlog = {};
    list.forEach(blog => {
        if (blog.likes > mostLikes) {
            mostLikes = blog.likes;
            mostLikedBlog = blog;
        }
    });
    return mostLikedBlog;
};

const mostBlogs = list => {
    const authorObj = {};
    let highestBlogs = {
        author: "",
        blogs: 0
    };
    list.forEach(blog => {
        authorObj[blog.author] = authorObj[blog.author] + 1 || 1;
    });
    for (let author in authorObj) {
        if (authorObj[author] > highestBlogs.blogs) {
            highestBlogs.author = author;
            highestBlogs.blogs = authorObj[author];
        }
    }
    return highestBlogs;
};

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs
};