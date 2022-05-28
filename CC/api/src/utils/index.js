const mapTopic = (payload, result) => (
    {
        topic: payload.name, 
        keyword: payload.keywords,
        text: payload.text,
        paperTitle: payload.title
    });

const mapPaper = (payload) => ({
    topic: payload.name,
    title: payload.title,
    url: payload.url,
    author: payload.author,
    abstract: payload.abstract

});

module.exports = {mapTopic, mapPaper}