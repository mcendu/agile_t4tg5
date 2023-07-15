import { Database } from 'better-sqlite3';

const currentSchemaSql =
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

/**
 * Create a SQLite database with the latest schema revision.
 * @param db The database to initialize.
 */
export default function createCurrentSchema(db: Database) {
    db.exec(currentSchemaSql);
}
