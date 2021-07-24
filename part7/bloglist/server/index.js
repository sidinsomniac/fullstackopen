const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");
const http = require("http");

const PORT = config.PORT;
const server = http.createServer(app);

server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});