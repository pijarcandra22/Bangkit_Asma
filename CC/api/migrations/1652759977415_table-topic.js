/* eslint-disable camelcase */

exports.up = pgm => {
    pgm.createTable('topic', {
        id: {
            type: 'TEXT',
            primaryKey: true,
        },
        name: {
            type: 'TEXT',
            notNull: true,
        },
        dominant_topic: {
            type: 'INTEGER',
            notNull: true,
        },
        keywords: {
            type: 'TEXT',
        },
        topic_perc:{
            type: 'FLOAT',
        },
        timestamp: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }    
    })
};

exports.down = pgm => {
   pgm.dropTable('topic');
};
