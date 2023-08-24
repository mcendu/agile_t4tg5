import { Database } from 'better-sqlite3';
import modules from '../config/modules';
import { insertModules } from '../utils/insert_modules';

const currentSchemaSql =
    "\
CREATE TABLE sa_metadata(\
    key TEXT PRIMARY KEY, \
    value BLOB \
) WITHOUT ROWID; \
CREATE TABLE pages(\
    id INTEGER PRIMARY KEY, \
    prev INTEGER, \
    name TEXT, \
    module INTEGER DEFAULT NULL, \
    FOREIGN KEY (module) REFERENCES modules(id) \
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
CREATE TABLE modules(\
    id INTEGER PRIMARY KEY, \
    name TEXT, \
    code TEXT, \
    enabled BOOLEAN DEFAULT TRUE, \
    grades TEXT DEFAULT NULL \
); \
CREATE INDEX module_list ON modules(id ASC); \
CREATE TABLE grades(\
    id INTEGER PRIMARY KEY, \
    type TEXT, \
    grade INTEGER, \
    weight INTEGER, \
    module_id INTEGER, \
    FOREIGN KEY(module_id) REFERENCES modules(id) \
); \
CREATE INDEX grade_list ON grades(id ASC); \
\
INSERT INTO sa_metadata(key, value) VALUES('schema_version', 2);";

/**
 * Create a SQLite database with the latest schema revision.
 * @param db The database to initialize.
 */
export default function createCurrentSchema(db: Database) {
    db.exec('BEGIN IMMEDIATE;');
    db.exec(currentSchemaSql);
    insertModules(db);
    db.exec('COMMIT;');
}
