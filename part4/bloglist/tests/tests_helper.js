const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
    {
        title: "Jo goes to Hollywood",
        author: "Siddhartha Chatterjee",
        url: "http://www.google.com",
        likes: 12,
    },
    {
        title: "Angels and Demons",
        author: "Siddhartha Chatterjee",
        url: "http://www.facebook.com",
        likes: 39,
    },
    {
        title: "Murder on the Orient Express",
        author: "Siddhartha Chatterjee",
        url: "http://www.twitter.com",
        likes: 44,
    }
];

const initialUsers = [
    {
        username: "sid",
        name: "Siddhartha Chatterjee",
        password: "qwerty1234"
    }
];

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(blog => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb, initialUsers, usersInDb };