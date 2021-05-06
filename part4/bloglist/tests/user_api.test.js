const app = require("../app");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const mongoose = require("mongoose");
const api = supertest(app);
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

});


afterAll(() => {
    mongoose.connection.close();
});