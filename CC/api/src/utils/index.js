const mapTopic = (payload) => (
    {
        topic: payload.topic, 
        keyword: payload.keyword,
        text: payload.text,
        paper: payload.map(payload)
    });

const mapPaper = (payload) => ({
    name: payload.name,
    url: payload.url
});