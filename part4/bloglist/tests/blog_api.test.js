const app = require("../app");
const testsHelper = require("./tests_helper");
const supertest = require("supertest");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany();
    await Blog.insertMany(testsHelper.initialBlogs);
});

test("blog are returned as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
});

test("there are three blogs", async () => {
    const blogs = await testsHelper.blogsInDb();
    expect(blogs).toHaveLength(testsHelper.initialBlogs.length);
});

test("The second blog is Angels and demons", async () => {
    const blogs = await testsHelper.blogsInDb();
    const titles = blogs.map(blog => blog.title);
    expect(titles).toContain("Angels and Demons");
});

test("unique identifier property of the blog posts is named id", async () => {
    const blogs = await testsHelper.blogsInDb();
    const testBlog = blogs[0];
    expect(testBlog.id).toBeDefined();
});

test("A valid blog is added", async () => {
    const newBlog = {
        title: "Personal Shopper",
        author: "Joseph Dean",
        url: "http://www.instagram.com",
        likes: 21,
    };
    await api.post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await testsHelper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(testsHelper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map(blog => blog.title);
    expect(titles).toContain("Personal Shopper");
});

test("if the likes is missing, it should default to 0", async () => {
    const newBlog = {
        title: "Personal Shopper",
        author: "Joseph Dean",
        url: "http://www.instagram.com"
    };
    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201);
    const blogs = await testsHelper.blogsInDb();
    expect(blogs[testsHelper.initialBlogs.length].likes).toBe(0);

});

test("blog without a title or url cannot be added", async () => {
    const newBlog = {
        author: "Sanjeev Goenka",
        likes: 21,
    };
    await api.post("/api/blogs")
        .send(newBlog)
        .expect(400);
    const blogsAtEnd = await testsHelper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(testsHelper.initialBlogs.length);
});

afterAll(() => {
    mongoose.connection.close();
});
