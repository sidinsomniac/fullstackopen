const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");



blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
    response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
    const { body: { title, author, url, likes, token } } = request;
    // eslint-disable-next-line no-undef
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
        title, author, url, likes,
        user: user._id
    });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
});

blogsRouter.get("/:id", async (request, response) => {
    const { id } = request.params;
    const blog = await Blog.findById(id);
    response.json(blog);
});

blogsRouter.delete("/:id", async (request, response) => {
    const { body: { token }, params: { id } } = request;
    // eslint-disable-next-line no-undef
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" });
    }

    const blog = await Blog.findById(id);

    if (decodedToken.id !== blog.user.toString()) {
        return response.status(401).json({ error: "not authorized to perform action" });
    }

    await Blog.findByIdAndRemove(id);
    response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
    const { body, params: { id } } = request;
    const newBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    };
    const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, { new: true });
    response.json(updatedBlog);
});

module.exports = blogsRouter;