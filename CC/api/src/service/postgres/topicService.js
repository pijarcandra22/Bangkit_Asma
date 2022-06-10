const pool = require('../../../db/db');
class TopicService{
    constructor() {
        this._pool = pool;
    }

    async getAllTopic(topikId){   
        const result = await this._pool('topik').where('topik', topikId+'.0').select('*').limit(10);
        if(result.length < 1) {
            throw new Error("topic tidak ada")
        }
        return result;
    }

    async getAllTweet() {
        const result = await this._pool.select('*').from('tweet').limit(10);
        if(result.length < 1) {
            throw new Error("topic tidak ada")
        }
        return result;
    }


    async getAllPaperByTopicId(topic) {
        // const result = await this._pool.select('t.topik','j.*').from('topik as t').leftJoin('jurnal as j', 't.id', 'j.topik_id').where('t.id',topicId);
        const result = await this._pool.select('j.*').from('jurnal as j').orderBy('Topik_'+topic, 'desc').limit(10)
        if(result.length < 1) {
            throw new Error("topic tidak ada")
        }
        return result;
    }

    // async addTopic(payload) {
    //     const {name, dominant_topic, topic_perc, keywords, text} = payload;
    //     const timestamp = new Date(Date.now());
    //     const id = `topic-${nanoid(16)}`;
    //     const query = {
    //         text: `insert into topics values($1,$2,$3,$4,$5,$6,$7) returning id`,
    //         values: [id,name, dominant_topic, keywords,topic_perc, timestamp,  text],
    //     }
    //     const result = await this._pool.query(query);

    //     return result.rows;
    // }

}

module.exports = TopicService;