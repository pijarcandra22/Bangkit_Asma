const { Pool } = require("pg");
const { nanoid } = require('nanoid');

class PaperService{
    constructor(){
        this._pool = new Pool();

    }

    async addPaper(payload, topicId) {
        const { title, url, author, abstract } = payload;
        const id = `paper-${nanoid(16)}`;
        const query = {
            text: 'insert into papers values($1,$2,$3,$4,$5,$6) returning id',
            values: [id, title, url, topicId, author, abstract]
        }
        const result = await this._pool.query(query);
        if(result.rowCount < 1) {
            throw new Error("gagal menambahkan paper");
        }
        return result.rows;
    }

}

module.exports = PaperService;