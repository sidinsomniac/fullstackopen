const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(middleware.requestLogger);
app.use("/api/blogs/", blogsRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const PORT = config.PORT;

console.log(mongoUrl, PORT);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});