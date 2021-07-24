const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
    const { body: { username, password } } = request;
    const user = await User.findOne({ username });

    const passwordCorrect = !user ? false : await bcrypt.compare(password, user.passwordHash);

    if (!passwordCorrect) {
        return response.status(401).json({
            error: "invalid username or password"
        });
    }

    const tokenObject = {
        username: user.username,
        id: user._id
    };

    // eslint-disable-next-line no-undef
    const token = jwt.sign(tokenObject, process.env.SECRET_KEY);

    response.status(200).send({
        token,
        username: user.username,
        name: user.name
    });
});

module.exports = loginRouter;