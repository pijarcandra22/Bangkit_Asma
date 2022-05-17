const routes = (handler) => [
    {
        method: 'POST',
        path: '/api/v1/topic',
        options: {
            handler: handler.postTopicHandler,
        }
    },
    {
        method: 'GET',
        path: '/api/v1/topic',
        options: {
            handler: handler.getTopicHandler,
        }
    }
]

module.exports = routes;