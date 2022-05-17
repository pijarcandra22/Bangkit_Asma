const TopicHandler = require("./handler");
const routes = require("./routes");

module.exports = {
    name: 'topic api',
    version: '1.0.0',
    register: async (server, {service}) => {
        const topicHandler = new TopicHandler(service);
        await server.route(routes(topicHandler));
    }
}