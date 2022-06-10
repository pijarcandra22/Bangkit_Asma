const mapTopic = (payload) => (
    {
        topic: parseInt(payload.topik),
        text: payload.text, 
        datetime: payload.datetime,
    });

const mapTweets = (payload) => (
    {
        keyword: payload.keyword,
        topic: payload.idtopik, 
    });

const mapPaper = (payload) => ({
    title: payload.judul,
    url: payload.url,
    author: payload.penulis,
    abstract: payload.abstrak
});

module.exports = {mapTopic, mapPaper, mapTweets}