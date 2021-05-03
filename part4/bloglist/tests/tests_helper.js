const Blog = require("../models/blog");

const initialBlogs = [
    {
        title: "Jo goes to Hollywood",
        author: "Jason Bourne",
        url: "http://www.google.com",
        likes: 12,
    },
    {
        title: "Angels and Demons",
        author: "Dan Brown",
        url: "http://www.facebook.com",
        likes: 39,
    },
    {
        title: "Murder on the Orient Express",
        author: "Agatha Christie",
        url: "http://www.twitter.com",
        likes: 44,
    }
];

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb: blogsInDb };