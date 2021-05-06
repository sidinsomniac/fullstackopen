const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs", { title: 1, url: 1, author: 1 });
    response.json(users);
});

userRouter.post("/", async (request, response) => {
    const { body: { username, password, name } } = request;
    const saltRounds = 10;

    if (!password || password?.length < 3) {
        return response.status(400).json({ error: "User validation failed: password: Path `password` is shorter than the minimum allowed length (3)." });
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
        username,
        name,
        passwordHash
    });
    const savedUser = await newUser.save();
    response.json(savedUser);
});

module.exports = userRouter;
