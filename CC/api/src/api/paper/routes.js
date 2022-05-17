const routes = (handler) => [
    {
        method: 'POST',
        path: '/api/v1/paper',
        handler: handler.postPaperHandler,
    }
]

module.exports = routes;