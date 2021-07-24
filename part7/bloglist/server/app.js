const express = require("express");
const app = express();
const cors = require("cors");
require("express-async-errors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const commentsRouter = require("./controllers/comment");

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        logger.info("connected to MongoDB");
    })
    .catch((error) => {
        logger.error("error connecting to MongoDB:", error.message);
    });

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(middleware.requestLogger);
app.use(middleware.defaultLikes);
app.use("/api/blogs/", blogsRouter);
app.use("/api/blogs/", commentsRouter);
app.use("/api/users/", usersRouter);
app.use("/api/login/", loginRouter);
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "test") {
    const resetRouter = require("./controllers/reset");
    app.use("/api/reset", resetRouter);
}
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;