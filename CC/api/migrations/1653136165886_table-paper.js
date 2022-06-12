/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('papers', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true
        },
        title: {
            type: 'TEXT',
            notNull: true,
        },
        url: {
            type: 'TEXT',
            notNull: true,
        },
        topic_id: {
            type: 'VARCHAR(50)',
            notNull: true,
        }
    })
    pgm.addConstraint('papers', 'fk_papers.id_topics.id', 'FOREIGN KEY(topic_id) REFERENCES topics(id) ON DELETE CASCADE');
};

exports.down = pgm => {
    pgm.dropTable('papers')
};
