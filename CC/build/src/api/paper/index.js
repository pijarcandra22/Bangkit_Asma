const routes = require("./routes");
const PaperHandler = require('./handler')
module.exports = {
    name: 'paper',
    version: '1.0.0',
    register: async (server, {service}) => {
        const paperHandler = new PaperHandler(service);
        await server.route(routes(paperHandler));
    }
}