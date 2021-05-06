const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response) => {
    const users = await User.find({});
    response.json(users);
});

userRouter.post("/", async (request, response) => {
    const { body: { username, password, name } } = request;
    const saltRounds = 10;
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
