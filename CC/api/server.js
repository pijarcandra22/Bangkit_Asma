require('dotenv').config();
const Hapi = require('@hapi/hapi');

// topic module
const topic = require('./src/api/topic');
const TopicService = require('./src/service/postgres/topicService');

// paper module
const paper = require('./src/api/paper');
const PaperService = require('./src/service/postgres/paperService');

const serverStart = async () => {
    const topicService = new TopicService();
    const paperService = new PaperService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*']
            }
        }
    });

    await server.register([
        {
            plugin: topic,
            options: {
                service: topicService,
            },
        },
        {
            plugin: paper,
            options: {
                service: paperService,
            }
        }
    ])

    server.ext('onPreResponse', (request, h) => {
        const { response } = request;
        if(response instanceof Error) {
            return h.response({
                status: 'fail',
                message: response.message,
            })
        }
        return response.continue || response;
    })
    
    await server.start();
    console.log(`server running on ${server.info.uri}`);
}

serverStart();