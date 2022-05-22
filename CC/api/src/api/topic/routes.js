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
    },
    {
        method: 'GET',
        path: '/api/v1/topic/{topicId}',
        options: {
            handler: handler.getAllPaperByTopicId,
        }
    }
]

module.exports = routes;