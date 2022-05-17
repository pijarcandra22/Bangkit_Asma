const { Pool } = require("pg");
const { nanoid } = require('nanoid');

class PaperService{
    constructor(){
        this._pool = new Pool();

    }

    async addPaper(payload, topicId) {
        const { name, url } = payload;
        const id = `paper-${nanoid(16)}`;
        const query = {
            text: 'insert into paper values($1,$2,$3,$4) returning id',
            values: [id, name, url, topicId]
        }
        const result = await this._pool.query(query);
        if(result.rowCount < 1) {
            throw new Error("gagal menambahkan paper");
        }
        return result.rows;
    }

}

module.exports = PaperService;