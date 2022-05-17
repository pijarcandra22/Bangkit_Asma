class PaperHandler{
    constructor(service) {
        this._service = service;
    }

    async postPaperHandler(request, h) {
        try {
            const {topicId} = request.params;
            await this._service.addPaper(request.payload, topicId);
            return h.response({
                status: 'success',
                message: 'paper berhasil ditambahakan'
            }).code(201);
        }catch(e) {
            return e;
        }

    }
}

module.exports = PaperHandler;