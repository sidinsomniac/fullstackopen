const app = require("../app");
const supertest = require("supertest");
const api = supertest(app);
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user");
const { initialUsers, usersInDb } = require("./tests_helper");

describe("when there is one user intially in the database", () => {
    beforeEach(async () => {
        await User.deleteMany({});
        const passwordHash = await bcrypt.hash("sekret", 10);
        const user = new User({ username: "root", name: "Root", passwordHash });

        await user.save();
    });

    test("addition of new user is successful", async () => {
        const usersAtStart = await usersInDb();
        await api.post("/api/users")
            .send(initialUsers[0])
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const userAtEnd = await usersInDb();
        expect(userAtEnd).toHaveLength(usersAtStart.length + 1);

        const userNames = userAtEnd.map(user => user.name);
        expect(userNames).toContain("Siddhartha Chatterjee");

    });

    test("creation fails with proper statuscode and message if username already taken", async () => {
        const usersAtStart = await usersInDb();

        const newUser = {
            username: "root",
            name: "Superuser",
            password: "superuser123",
        };

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);

        expect(result.body.error).toContain("`username` to be unique");

        const usersAtEnd = await usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test("creation fails with proper statuscode and message if password is shorter than length 3", async () => {
        const usersAtStart = await usersInDb();

        const newUser = {
            username: "user3",
            name: "Superuser3",
            password: "su",
        };

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);

        expect(result.body.error).toContain("Path `password` is shorter");

        const usersAtEnd = await usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

});


afterAll(() => {
    mongoose.connection.close();
});