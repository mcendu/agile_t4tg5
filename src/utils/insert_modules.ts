import { Database } from 'better-sqlite3';
import modules from '../config/modules';

/**
 * Insert modules of the curriculum and their associated pages.
 */
export function insertModules(db: Database) {
    db.exec('SAVEPOINT insert_modules');
    const insertModule = db.prepare(
        'INSERT INTO modules(name, code, page) VALUES (?,?,?)',
    );
    const generatePage = db.prepare(
        'INSERT INTO pages(name, userCreated) VALUES (?, ?) RETURNING id;',
    );
    modules.forEach((module) => {
        const page_id = generatePage.run(module.name, 0);
        insertModule.run(module.name, module.code, page_id.lastInsertRowid);
    });
    db.exec('RELEASE insert_modules');
}
