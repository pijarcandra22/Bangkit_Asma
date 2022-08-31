/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns('papers', {
        author: {
            type: 'TEXT',
        },
        abstract: {
            type: 'TEXT'
        }
    });
};

exports.down = pgm => {
    pgm.dropColumns('papers', ['author','abstract'])
};
