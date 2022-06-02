const pool = require('../../../db/db');
const { nanoid } = require('nanoid');

class PaperService{
    constructor(){
        this._pool = pool;
    }

    async addPaper(payload, topicId) {
        const { title, url, author, abstract } = payload;
        const id = `paper-${nanoid(16)}`;
        // const query = {
        //     text: 'insert into papers values($1,$2,$3,$4,$5,$6) returning id',
        //     values: [id, title, url, topicId, author, abstract]
        // }
        const result = await this._pool('jurnal').insert({id, title, url, topicId, author, abstract}).returning('id');
        if(result.rowCount < 1) {
            throw new Error("gagal menambahkan paper");
        }
        return result.rows;
    }

}

module.exports = PaperService;