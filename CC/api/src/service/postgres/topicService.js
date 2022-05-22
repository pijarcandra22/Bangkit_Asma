const { Pool } = require('pg');
const {nanoid} =  require('nanoid');
class TopicService{
    constructor() {
        this._pool = new Pool();
    }

    async getAllTopic(){
        const query = {
            text: `select t.name, t.keywords, t.text, p.title, p.url
                   from topics t
                   left join papers p 
                   on t.id = p.topic_id`
        }
        
        const result = await this._pool.query(query);
        if(result.rowCount < 1) {
            throw new Error("topic tidak ada")
        }
        return result.rows;
    }

    async getAllPaperByTopicId(topicId) {
        const query = {
            text: `select t.name, t.keywords, t.text, p.title, p.url
                   from topics t
                   left join papers p 
                   on t.id = p.topic_id
                   where p.topic_id = $1`,
            values: [topicId]
        }
        
        const result = await this._pool.query(query);
        if(result.rowCount < 1) {
            throw new Error("topic tidak ada")
        }
        return result.rows;
    }

    async addTopic(payload) {
        const {name, dominant_topic, topic_perc, keywords, text} = payload;
        const timestamp = new Date(Date.now());
        const id = `topic-${nanoid(16)}`;
        const query = {
            text: `insert into topics values($1,$2,$3,$4,$5,$6,$7) returning id`,
            values: [id,name, dominant_topic, keywords,topic_perc, timestamp,  text],
        }
        const result = await this._pool.query(query);

        return result.rows;
    }

}

module.exports = TopicService;