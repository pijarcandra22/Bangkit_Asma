const mapTopic = (payload) => (
    {
        topic: parseInt(payload.topik),
        text: payload.text, 
        datetime: payload.datetime,
    });

const mapTweets = (payload) => (
    {
        keyword: payload.Keyword,
        topic: payload.IdTopik, 
    });

const mapPaper = (payload) => ({
    title: payload.Judul,
    url: payload.PDF_LINK,
    author: payload.Penulis,
    abstract: payload.Abstrak
});

module.exports = {mapTopic, mapPaper, mapTweets}