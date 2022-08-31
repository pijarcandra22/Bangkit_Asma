const routes = (handler) => [
    {
        method: 'POST',
        path: '/api/v1/paper/{topicId}',
        handler: handler.postPaperHandler,
    }
]

module.exports = routes;