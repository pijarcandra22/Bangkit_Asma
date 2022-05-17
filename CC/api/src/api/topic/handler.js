const { mapTopic } = require('../../utils');

class TopicHandler{
    constructor(service){
        this._service = service;
    }

    async postTopicHandler(request, h){
        try {
            const result = this._service.addTopic(request.payload);
            return h.response({
                status: 'success',
                data: {
                    topic_id: result.id,
                }
            }).code(201);
        }catch(e) {
            return e;
        }
    }

    async getTopicHandler(request, h) {
        try {
            const result = this._service.getAllTopic();
            return h.response({
                status: 'success',
                data: mapTopic(result),
            }).code(200);
        }catch(e) {
            return e;
        }
    }
}

module.exports = TopicHandler;