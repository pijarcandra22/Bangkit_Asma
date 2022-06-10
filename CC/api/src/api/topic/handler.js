const { mapTopic, mapPaper, mapTweets } = require('../../utils');

class TopicHandler{
    constructor(service){
        this._service = service;
        
        this.getTopicHandler = this.getTopicHandler.bind(this);
        this.postTopicHandler = this.postTopicHandler.bind(this);
        this.getAllTweetHandler = this.getAllTweetHandler.bind(this);
        this.getAllPaperByTopicId = this.getAllPaperByTopicId.bind(this);
    }

    async postTopicHandler(request, h){
        try {
            const result = await this._service.addTopic(request.payload);
            return h.response({
                status: 'success',
                data: {
                    topic_id: result,
                }
            }).code(201);
        }catch(e) {
            return e;
        }
    }

    async getTopicHandler(request, h) {
        try {
            const result = await this._service.getAllTopic(request.params.topicId);
            return h.response({
                status: 'success',
                data: {
                    count: result.length,
                    topic: result.map(mapTopic)
                },
            }).code(200);
        }catch(e) {
            return e;
        }
    }

    async getAllTweetHandler(request, h) {
        try {
            const result = await this._service.getAllTweet();
            return h.response({
                status: 'success',
                data: {
                    count: result.length,
                    tweets: result.map(mapTweets)
                },
            }).code(200);
        }catch(e) {
            return e;
        }
    }

    async getAllPaperByTopicId(request, h) {
        try {
            const result = await this._service.getAllPaperByTopicId(request.params.topicId);
            return h.response({
                status: 'success',
                data: {
                    count: result.length,
                    jurnals: result.map(mapPaper)
                },
            }).code(200);
        }catch(e) {
            return e;
        }
    }
}

module.exports = TopicHandler;