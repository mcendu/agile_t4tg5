/*
 * Copyright (C) 2023 Goldsmiths, University of London.
 * All rights reserved.
 */

import { Database } from 'better-sqlite3';

const upSql =
    "\
BEGIN TRANSACTION; \
CREATE TABLE sa_metadata(\
    key TEXT PRIMARY KEY, \
    value BLOB \
) WITHOUT ROWID; \
CREATE TABLE pages(\
    id INTEGER PRIMARY KEY, \
    prev INTEGER, \
    name TEXT \
); \
CREATE INDEX page_list ON pages(prev ASC); \
CREATE TABLE widgets(\
    id INTEGER PRIMARY KEY, \
    page INTEGER, \
    type TEXT, \
    data TEXT, \
    FOREIGN KEY(page) REFERENCES pages(id) \
); \
CREATE INDEX page_widgets ON widgets(page); \
INSERT INTO sa_metadata(key, value) VALUES('schema_version', 0); \
COMMIT TRANSACTION;";

const downSql =
    '\
BEGIN TRANSACTION; \
DROP TABLE widgets; \
DROP TABLE pages; \
DROP TABLE sa_metadata; \
COMMIT TRANSACTION;';

export default {
    up(db: Database) {
        db.exec(upSql);
    },
    down(db: Database) {
        db.exec(downSql);
    },
};
