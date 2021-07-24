const commentsRouter = require("express").Router();
const Comment = require("../models/comment");
const Blog = require("../models/blog");

commentsRouter.post("/:id/comments", async (request, response) => {
    const { body: { text }, params: { id } } = request;
    const blog = await Blog.findById(id);
    const comment = new Comment({ text, blog: id });
    const savedComment = await comment.save();
    blog.comments = blog.comments.concat(savedComment.id);
    await blog.save();
    response.status(201).json(savedComment);
});

module.exports = commentsRouter;