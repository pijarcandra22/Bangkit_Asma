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
    url: payload.url
});

module.exports = {mapTopic, mapPaper}