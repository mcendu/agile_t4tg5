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
INSERT INTO sa_metadata(key, value) VALUES('schema_version', 0); \
CREATE TABLE modules(\
    id INTEGER PRIMARY KEY, \
    name TEXT, \
    code TEXT, \
    enabled BOOLEAN DEFAULT TRUE, \
    grades TEXT, \
    page INTEGER \
); \
CREATE INDEX module_list ON modules(id ASC); \
COMMIT TRANSACTION;";

const modules = [
    { name: 'Introduction to Programming I', code: 'CM1005' },
    { name: 'Introduction to Programming II', code: 'CM1010' },
    { name: 'Computational Mathematic', code: 'CM1015' },
    { name: 'Discrete Mathematics', code: 'CM1020' },
    { name: 'Fundamentals of Computer Science', code: 'CM1025' },
    { name: 'How Computers Work', code: 'CM1030' },
    { name: 'Algorithms and Data Structures I', code: 'CM1035' },
    { name: 'Web Development', code: 'CM1040' },
    { name: 'Object Oriented Programming', code: 'CM2005' },
    { name: 'Software Design and Development', code: 'CM2010' },
    { name: 'Programming with Data', code: 'CM2015' },
    { name: 'Agile Software Projects', code: 'CM2020' },
    { name: 'Computer Security', code: 'CM2025' },
    { name: 'Graphics Programming', code: 'CM2030' },
    { name: 'Algorithms and Data Structures II', code: 'CM2035' },
    { name: 'Databases, Networks and the Web', code: 'CM2040' },
    { name: 'Data Science', code: 'CM3005' },
    { name: 'Databases and Advanced Data Techniques', code: 'CM3010' },
    { name: 'Machine Learning and Neural Networks', code: 'CM3015' },
    { name: 'Artificial Intelligence  ', code: 'CM3020' },
    { name: 'Virtual Reality', code: 'CM3025' },
    { name: 'Games Development', code: 'CM3030' },
    { name: 'Advanced Web Development', code: 'CM3035' },
    { name: 'Physical Computing and Internet of Things', code: 'CM3040' },
    { name: '3D Graphics and Animation', code: 'CM3045' },
    { name: 'Mobile Development', code: 'CM3050' },
    { name: 'Interaction Design', code: 'CM3055' },
    { name: 'Natural Language Processing', code: 'CM3060' },
    { name: 'Intelligent Signal Processing', code: 'CM3065' },
    { name: 'Final Project', code: 'CM3070' },
];

/**
 * Create a SQLite database with the latest schema revision.
 * @param db The database to initialize.
 */
export default function createCurrentSchema(db: Database) {
    db.exec(currentSchemaSql);
    // Insert all the UoL Computer Science modules into modules db upon creation
    const module_insert = db.prepare(
        'INSERT INTO modules(name, code, page) VALUES (?,?,?)',
    );
    const page_maker = db.prepare(
        'INSERT INTO pages(name, userCreated) VALUES (?, ?) RETURNING id;',
    );
    modules.forEach((module) => {
        const page_id = page_maker.run(module.name, 0);
        module_insert.run(module.name, module.code, page_id.lastInsertRowid);
    });
}
