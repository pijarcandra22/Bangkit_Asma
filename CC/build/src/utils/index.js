const mapTopic = (payload, result) => (
    {
        topic: payload.topik, 
        datetime: payload.datetime,
    });

const mapPaper = (payload) => ({
    topic: payload.topik,
    title: payload.judul,
    url: payload.pdf_link,
    author: payload.penulis,
    abstract: payload.abstrak
});

module.exports = {mapTopic, mapPaper}