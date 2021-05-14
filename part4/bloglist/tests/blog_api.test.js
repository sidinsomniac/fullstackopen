const app = require("../app");
const supertest = require("supertest");
const api = supertest(app);
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const { initialBlogs, blogsInDb } = require("./tests_helper");
const authConfig = { Authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNpZCIsImlkIjoiNjA5ZTdmMjRmNDBjOTdhZjIwOTg4OWJjIiwiaWF0IjoxNjIwOTk5OTcyfQ.MbDzFBF4L77RC2Q9MCRCt48At8eAFFLQQX5WY-afF3Y" };


describe("When initially some blogs are posted", () => {

    beforeEach(async () => {
        await Blog.deleteMany();
        await Blog.insertMany(initialBlogs);
    });

    test("blog are returned as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("there are three blogs in total", async () => {
        const blogs = await blogsInDb();
        expect(blogs).toHaveLength(initialBlogs.length);
    });

    test("The second blog is 'Angels and Demons'", async () => {
        const blogs = await blogsInDb();
        const titles = blogs.map(blog => blog.title);
        expect(titles).toContain("Angels and Demons");
    });

    test("unique identifier property of the blog posts is named id", async () => {
        const blogs = await blogsInDb();
        const testBlog = blogs[0];
        expect(testBlog.id).toBeDefined();
    });
});

describe("When a blog is added", () => {

    test("returns a status-code 201 if a valid blog", async () => {
        const blogsAtStart = await blogsInDb();

        const newBlog = {
            title: "Personal Shopper",
            author: "Siddhartha Chatterjee",
            url: "http://www.instagram.com",
            likes: 21,
        };
        await api.post("/api/blogs")
            .send(newBlog)
            .set(authConfig)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const blogsAtEnd = await blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);

        const titles = blogsAtEnd.map(blog => blog.title);
        expect(titles).toContain("Personal Shopper");
    });

    test("if the likes is missing, it should default to 0", async () => {
        const blogsAtStart = await blogsInDb();
        const newBlog = {
            title: "Personal Shopper",
            author: "Joseph Dean",
            url: "http://www.instagram.com"
        };
        await api
            .post("/api/blogs")
            .send(newBlog)
            .set(authConfig)
            .expect(201);
        const blogs = await blogsInDb();
        expect(blogs[blogsAtStart.length].likes).toBe(0);

    });

    test("a blog without a title or url cannot be added", async () => {
        const blogsAtStart = await blogsInDb();
        const newBlog = {
            author: "Sanjeev Goenka",
            likes: 21,
        };
        await api.post("/api/blogs")
            .send(newBlog)
            .set(authConfig)
            .expect(400);
        const blogsAtEnd = await blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
    });
});

describe("when a blog is deleted", () => {

    test("it returns 401 Unauthorized if token is not provided", async () => {
        const blogs = await blogsInDb();
        let { id } = blogs[blogs.length - 1];
        await api.delete(`/api/blogs/${id}`)
            .expect(401);
    });

    test("the id should no longer exist", async () => {
        const blogs = await blogsInDb();
        let { id } = blogs[blogs.length - 1];
        await api.delete(`/api/blogs/${id}`)
            .set(authConfig)
            .expect(204);

        const blogsAtEnd = await blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogs.length - 1);

        const ids = blogsAtEnd.map(blog => blog.id);
        expect(ids).not.toContain(id);
    });
});

describe("when a blog is updated", () => {

    test("it should contain updated value", async () => {
        const blogsAtStart = await blogsInDb();
        const blogUpdate = {
            "title": "How to evolve",
            "author": "Raichu",
            "url": "https://www.facebook.com",
            "likes": 72
        };
        const blogs = await blogsInDb();
        const selectedBlog = blogs[2];

        await api.put(`/api/blogs/${selectedBlog.id}`)
            .send(blogUpdate)
            .expect(200);

        const blogsAtEnd = await blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
        expect(blogsAtEnd[2].author).toBe("Raichu");

    });
});

afterAll(() => {
    mongoose.connection.close();
});
