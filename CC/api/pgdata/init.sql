CREATE USER developer WITH PASSWORD 'supermanisdead';
GRANT ALL PRIVILEGES on topicapp to developer;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO developer;

create table topics({
    id VARCHAR(50) primary key,
    name TEXT not null,
    dominant_topic INTEGER not null,
    keywords TEXT not null,
    topic_perc FLOAT not null,
    timestamp timestamp not null,
    text TEXT not null
});

create table papers({
    id VARCHAR(50) primary key,
    title TEXT not null,
    url INTEGER not null,
    topic_id VARCHAR(50) REFERENCES topics (id),
});

