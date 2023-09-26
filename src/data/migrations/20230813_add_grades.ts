/*
 * Copyright (C) 2023 Goldsmiths, University of London.
 * All rights reserved.
 */

import { Database } from 'better-sqlite3';

const upSql = `
CREATE TABLE grades(\
    id INTEGER PRIMARY KEY, \
    type TEXT, \
    grade INTEGER, \
    weight INTEGER, \
    module_id INTEGER, \
    FOREIGN KEY(module_id) REFERENCES modules(id) \
); \

`;

const downSql = `
BEGIN IMMEDIATE;

DROP TABLE grades;

COMMIT;
`;

export default {
    up(db: Database) {
        db.exec('BEGIN IMMEDIATE;');
        db.exec(upSql);
        db.exec('COMMIT;');
    },
    down(db: Database) {
        db.exec(downSql);
    },
};
