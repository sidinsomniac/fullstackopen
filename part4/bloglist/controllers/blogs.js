const blogsRouter = require("express").Router();
const Blog = require("../models/blog");


blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
    const blog = new Blog(request.body);
    const result = await blog.save();
    response.status(201).json(result);
});

blogsRouter.get("/:id", async (request, response) => {
    const { id } = request.params;
    const blog = await Blog.findById(id);
    response.json(blog);
});

blogsRouter.delete("/:id", async (request, response) => {
    const { id } = request.params;
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