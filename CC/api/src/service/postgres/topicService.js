const { Pool } = require("pg");
const {nanoid} =  require('nanoid');
class TopicService{
    constructor() {
        this._pool = new Pool();
    }

    async getAllTopic(){
        const query = {
            text: `select t.topic, t.keyword, t.text, p.name, p.url
                   from topics t
                   left join paper p 
                   on t.id = p.topic_id`
        }
        const result = await this._pool.query(query);
        if(result.rowCount < 1) {
            throw new Error("topic tidak ada")
        }
        return result.rows;
    }

    async addTopic(payload) {
        const {dominant_topic, topic_perc, keywords, text} = payload;
        const timestamp = new Date(Date.now());
        const id = `topic-${nanoid(16)}`;
        const query = {
            text: `insert into topic values($1,$2,$3,$4,$5,$6) returning id`,
            values: [id,dominant_topic, topic_perc, keywords, text, timestamp],
        }
        const result = await this._pool.query(query);

        return result.rows;
    }

}

module.exports = TopicService;